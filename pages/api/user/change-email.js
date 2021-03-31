import { getSession } from 'next-auth/client';
import { ObjectId } from 'mongodb';

import { connectToDatabase } from '../../../lib/db';

async function handler (req, res) {

	if(req.method !== 'PATCH') {
		return;
	}

	const session = await getSession({ req: req });

	console.log("Session from server: ", session);

	if (!session) {
		res.status(401).json({
			message: "Unauthorized!"
		});

		return;
	}

	const { userId, email } = req.body;
	const uid = new ObjectId(userId);
	console.log(" From server: ", userId, email);

	let client;
	try {
		client = await connectToDatabase();
	} catch (error) {
		res.status(400).json({ error: error, message: "Could not connect!" });
		client.close();
		return;
	}

	console.log("Connected");

	const usersCollection = client.db().collection('poets');

	let user;
	try {
		user = await usersCollection.findOne({ _id: uid });
	} catch (error) {
		res.status(401).json({ error: error, message: "Could not find account!", id: uid });
		client.close();
		return;
	}

	console.log("Found account");

	try {
		console.log("In update try");
		const result = await usersCollection.updateOne(
			{ _id : uid },
			{ $set: { email: email }}
		);
		console.log("After update try");

	} catch (error) {
		res.status(404).json({ error: error, message: "Could not update document!"});
		client.close();
		return;
	}

	res.status(200).json({ message: "Email updated!"});
	client.close()
};

export default handler;








