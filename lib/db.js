import { MongoClient } from 'mongodb';


const databaseUrl = process.env.DATABASE_URL;

export async function connectToDatabase() {
	
	let client;
	try {
		client = await MongoClient.connect( databaseUrl, { useUnifiedTopology: true } );
	} catch (error) {
		alert("Could not connect to database.");
		return;
	}
	
	return client;
}