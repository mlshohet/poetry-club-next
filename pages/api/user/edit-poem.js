import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {

	if (req.method !== 'PATCH') {
		return;
	}

	const session = await getSession({ req: req });

	if (!session) {
		res.status(401).json({ message: "Unauthorized!" });
		return;
	}

	const { email } = session;
	const { poemId, newText } = req.body;

	let client;

	try	{
		client = await connectToDatabase();
	} catch (error) {
		res.status(400).json({ message: "Could not connect!" });
		client.close()
		return;
	}

	const usersCollection = client.db().collection('poets');

	try {
		const result = await usersCollection.updateOne(
			{ poemId: poemId }, 
			{ $set: { text: newText }}
		);
	} catch (error) {
		res.status(404).json({ message: "Could not update document!"});
		client.close();
		return;
	}

	res.status(200).json({ message: "Document updated!" });
	clien.close();
}

export default handler;









