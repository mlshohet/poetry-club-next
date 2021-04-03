import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../../lib/db';

export async function handler (req, res) {

	if (req.method !== 'GET') {
		res.status(500).json({ message: "Invalid request" });
		return;
	};

	const { readingList } = req.query;
	const list = readingList.split(',');

	let client;

	try {
		client = await connectToDatabase();
	} catch (error) {
		res.status(400).json({ message: 'Could not connect!' });
		client.close();
		return;
	}

	const collection = client.db().collection('poets');

	const poetIds = list.map(id => new ObjectId(id));

	let readingListPoets;
	try {
		const cursor = await collection.find({ _id: { $in: poetIds } } );
		readingListPoets = await cursor.toArray();
	} catch (error) {
		res.status(401).json({ message: "Could not find list!"})
		client.close();
		return;
	}

	res.status(200).json({
		message: "Returned reading list!",
		readingList: readingListPoets
	});

	client.close();
	return;
}

export default handler;





