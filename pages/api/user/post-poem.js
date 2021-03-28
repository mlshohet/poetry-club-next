import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../lib/db';
import { verifyPassword } from '../../../lib/auth';

async function handler(req, res) {

	if (req.method !== 'POST') {
		return;
	}

	const session = await getSession({ req: req });

	if (!session) {
		res.status(401).json({ message: 'Unauthorized!'});
		return;
	}
			
	const { text, date, poemId } = req.body;

	console.log('Data from server: ', session);

	if (!text || text === {} || !date || !poemId) {
		res.status(422).json({ message: 'Invalid input' });
		return;
	}

	const poemDocument = { text, date, poemId };
	console.log()

	let client;

	try {
		client = await connectToDatabase();
	} catch (err) {
		res.status(400).json({ message: "Could not connect!" });
		client.close();
		return;
	}

	const userCollection = client.db().collection('poets');

	let result;
	const userEmail = session.user.email;

	console.log("Email from server: ", userEmail);
	const updateDocument = { $push: { "poems": poemDocument } };
	
	try {
		result = await userCollection.updateOne(
			{ email: userEmail }, 
			updateDocument
		);
		
	} catch (error) {
		res.status(401).json({
			message: "Could not store document!"
		});
		client.close();
		return;
	}

	res.status(201).json({
			message: 'Successfully stored document',
	});

	client.close();
};


export default handler;





