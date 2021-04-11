import { getSession } from 'next-auth/client';
import { ObjectId } from 'mongodb';

import { connectToDatabase } from '../../../lib/db';

async function handler (req, res) {

	if(req.method !== 'PATCH') {
		res.status(400).json({ message: "Invalid request!" });
		return;
	}

	let session;
	try {
		session = await getSession({ req: req });
	} catch (error) {
		res.status(400).json({ message: "Invalid credentials." });
		return;
	}
	
	if (!session) {
		res.status(401).json({
			message: "Unauthorized!"
		});

		return;
	}

	const { userId, email } = req.body;

	const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	if (
		!email || email === '' ||
		!regex.test(email) || email.length > 30
	) {
		res.status(400).json({ message: "Invalid email."});
		return;
	}

	const uid = new ObjectId(userId);


	let client;
	try {
		client = await connectToDatabase();
	} catch (error) {
		res.status(400).json({ error: error, message: "Could not connect!" });
		client.close();
		return;
	}

	const usersCollection = client.db().collection('poets');

	let user;
	try {
		user = await usersCollection.findOne({ _id: uid });
	} catch (error) {
		res.status(401).json({ error: error, message: "Could not find account!", id: uid });
		client.close();
		return;
	}

	try {
		const result = await usersCollection.updateOne(
			{ _id : uid },
			{ $set: { email: email }}
		);

	} catch (error) {
		res.status(404).json({ error: error, message: "Could not update document!"});
		client.close();
		return;
	}

	res.status(200).json({ message: "Email updated!"});
	client.close()
};

export default handler;








