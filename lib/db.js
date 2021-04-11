import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
	
	let client;
	try {
		client = await MongoClient.connect(
			'',
			{ useUnifiedTopology: true }
		);
	} catch (error) {
		console.log("Could not connect!");
		return;
	}
	
	return client;
}