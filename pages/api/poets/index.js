import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {

	if (req.method !== "GET") {
		res.status(400).json({ message: "Invalid request" });
		return;
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
	
	let poets;

	try {
		const cursor = await collection.find({});
		poets = await cursor.toArray();
		} catch (error) {
		res.status(500).json({
			message: "Could not get featured."
		});
		client.close();
		return;
	}

	res.status(201).json({
		poets: poets,
		message: "Returned all poets."
	});

	client.close();
	return;
}

export default handler;



