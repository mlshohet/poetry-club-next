import { getSession } from 'next-auth/client';

import { ObjectId } from 'mongodb';

import { connectToDatabase } from '../../../../../lib/db';

async function handler(req, res) {

	if (req.method !== 'PATCH') {
		return;
	}

	const session = await getSession({ req: req });

	if (!session) {
		res.status(401).json({ message: "Unauthorized!" });
		return;
	}

	let uid = new ObjectId(session.user.userId);

	const { text } = req.body;

	const poemId = req.query.poemId;

	let client;

	try	{
		client = await connectToDatabase();
	} catch (error) {
		res.status(400).json({ message: "Could not connect!" });
		client.close()
		return;
	}

	const usersCollection = client.db().collection('poets');

	let item;
	let result;
	try {

		item = await usersCollection.findOne({ _id: uid });

		if (!item) {
			res.status(404).json({ message: "User not found." });
			client.close();
			return;
		}

		result = await usersCollection.updateOne(
			{ _id: uid },
			{ $set: { "poems.$[element].text": text } },
			{ arrayFilters: [ { "element.poemId": poemId } ] }
		);


	} catch (error) {
		res.status(404).json({ message: "Could not update document!", error: error.message });
		client.close();
		return;
	}

	res.status(200).json({ message: "Document updated!" });
	client.close();
}

export default handler;









