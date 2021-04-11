import { getSession} from 'next-auth/client';

import { ObjectId } from 'mongodb';

import { connectToDatabase } from '../../../lib/db'; 

async function handler (req, res) {

	if (req.method !== 'PATCH') {
		res.status(400).json({ message: "Invalid request!" });
		return;
	}

	const session = await getSession({ req: req });

	if (!session) {
		res.status(401).json({ message: "Unauthorized!" });
		return;
	}

	const { userId, imageUrl } = req.body;
	const uid = ObjectId(userId);

	let client;
	
	try {
		client = await connectToDatabase();
	} catch (error) {
		res.status(400).json({ message: "Could not connect" });
		client.close();
		return;
	};

	const collection = client.db().collection('poets');

	try {
		const item = await collection.findOne({ _id: uid}); 
	} catch (error) {
		client.close();
		res.status(401).json({ message: "Could not find profile!" });
		return;
	}

	let result;
	try	{
		result = await collection.updateOne(
			{ _id: uid },
			{ $set: { imageUrl, imageUrl } }
		);
	} catch (error) {
		res.status(400).json({ message: "Could not update document!" });
		client.close();
		return;
	}

	res.status(200).json({
		message: "Upload successful!",
	});

	await client.close();
}

export default handler;











