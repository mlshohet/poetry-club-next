import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
	
	let client;
	try {
		client = await MongoClient.connect(
			'mongodb+srv://noontide-db-user:CdmxYeOPFExKkffi@cluster0.qvis4.mongodb.net/noontide-poetry-db?retryWrites=true&w=majority',
			{ useUnifiedTopology: true },
		);
	} catch (error) {
		alert("Could not connect to database.");
		return;
	}
	
	return client;
}

//'mongodb+srv://noontide-db-user:CdmxYeOPFExKkffi@cluster0.qvis4.mongodb.net/noontide-poetry-db?retryWrites=true&w=majority'