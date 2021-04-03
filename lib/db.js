import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
	
	let client;
	try {
		client = await MongoClient.connect(
			'mongodb+srv://mongo-mike:Y397geRcO3RfPTYI@cluster0.qvis4.mongodb.net/apostrophe-poetry?retryWrites=true&w=majority'
		);
	} catch (error) {
		throw new Error("Could not connect!");
		return;
	}
	
	return client;
}