import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {

	if (req.method !== "GET") {
		return;
	}

	const userName = req.query.poetId;

	let client;

	try {
		client = await connectToDatabase();
	} catch (err) {
		res.status(400).json({ message: "Could not connect!" });
		client.close();
		return;
	}

	const usersCollection = client.db().collection('poets');
	let poet;

	try {
		if (userName === 'all') {
			const cursor = await usersCollection.find({});
			poet = await cursor.toArray();
		} else {
			poet = await usersCollection.findOne({ userName: userName});
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



