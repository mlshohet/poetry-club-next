import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
	
	let client;
	try {
		client = await MongoClient.connect(
			''
		);
	} catch (error) {
		throw new Error("Could not connect!");
		return;
	}
	
	return client;
}