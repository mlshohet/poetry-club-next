import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
	
	let client;
	try {
		client = await MongoClient.connect(
			'',
			{ useUnifiedTopology: true }
		);
	} catch (error) {
		alert("Could not connect to database.");
		return;
	}
	
	return client;
}