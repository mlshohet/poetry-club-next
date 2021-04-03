import { getSession } from 'next-auth/client';

import { connectToDatabase } from '../../../lib/db';

export async function handler (req, res) {

	if (req.method !== 'PATCH') {
		res.status(400).json({ message: "Invalid method" });
		return;
	}

	let session;
	try {
		session = await getSession({ req: req });
	} catch (error) {
		res.status(500).json({ message: "Unauthorized!" });
		return;
	}

	if (!session) {
		res.status(400).json({ message: "Unauthorized access!", error });
		return;
	}

	const { email, password } = session.user;
	const { poetId } = req.body;
	console.log("Poet Id: ", poetId);

	let client;

	try {
		client = await connectToDatabase();
	} catch (error) {
		res.status(401).json({ message: " Could not connect!", error });
		client.close();
		return;
	}

	const collection = client.db().collection('poets');

	let result;
	try {
		const result = await collection.updateOne(
			{ email: email },
			{ $pull: { "readingList": poetId } }
		);
	} catch (error) {
		res.status(401).json({ message: "Could not remove from list!", error });
		client.close();
		return;
	}

	let item;
	
	try {
		item = await collection.findOne({ email: email });
	} catch (error) {
		res.status(404).json({ message: "User not found!", error });
		client.close();
		return;
	}

	res.status(200).json({ message: "Removed from list!", poetId, poet: item });

	client.close();
	return;
};

export default handler;










