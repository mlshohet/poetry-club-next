import { getSession } from 'next-auth/client';
import { ObjectId } from 'mongodb';

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

	let uid;
	try {
		uid = new ObjectId(session.user.userId);
	} catch (error) {
		res.status(400).json({ message: "Could not identify user." });
		return;
	}

	if (!text || text === {} || text.blocks.length === 0 || !date || !poemId) {
		res.status(422).json({ message: 'Invalid input' });
		return;
	}

	const poemDocument = { text, date, poemId };

	let client;

	try {
		client = await connectToDatabase();
	} catch (err) {
		res.status(400).json({ message: "Could not connect!" });
		client.close();
		return;
	}

	const userCollection = client.db().collection('poets');



	const updateDocument = { $push: { "poems": poemDocument } };

	let user;
	try {
		user = await userCollection.findOne({ _id: uid });
		if (user) {
			if (user.poems.length > 499) {
				throw new Error('You have reached the maximum number of documents.');
			}
		}
	} catch (error) {
		res.status(405).json({ message: "You have reached the maximum number of documents." });
		return;
	}
	
	let result;
	try {
		result = await userCollection.updateOne(
			{ _id: uid }, 
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





