import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {

	if (req.method !== "GET") {
		res.status(400).json({ message: "Invalid request" });
		return;
	}

	const id = req.query.poetId;

	let userId;
	try {
		userId = await new ObjectId(id);
	} catch (error) {
		userId = null;
	}

	let client;

	try {
		client = await connectToDatabase();
	} catch (err) {
		res.status(400).json({ message: "Could not connect!" });
		client.close();
		return;
	}

	const collection = client.db().collection('poets');
	
	let poet;

	try {
		if (id === 'all') {
			const cursor = await collection.find({});
			poet = await cursor.toArray();
		} else {
			poet = await collection.findOne({ 
				$or: [{ slug: id }, { email: id }, { _id: userId }]
			});
		}
	} catch (error) {
		res.status(500).json({
			message: "Could not find profile!"
		});
		client.close();
		return;
	}

	res.status(201).json({
		poet: poet,
		message: "Success! Found user!"
	});

	client.close();
	return;
}

export default handler;



