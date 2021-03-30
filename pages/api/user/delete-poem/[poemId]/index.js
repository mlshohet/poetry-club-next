import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../../../lib/db';

async function handler(req, res) {

	if (req.method !== 'PATCH') {
		return;
	}

	const session = await getSession({ req: req });

	if (!session) {
		res.status(401).json({ message: "Unauthorized!" });
		return;
	}

	const { email } = session.user;
	const poemId = req.query.poemId;

	console.log("Poem Id from api: ", poemId);

	let client;

	try	{

		console.log("In delete try");
		client = await connectToDatabase();
	} catch (error) {
		res.status(400).json({ message: "Could not connect!" });
		client.close()
		return;
	}

	const usersCollection = client.db().collection('poets');

	let item;
	let result;
	try {

		item = await usersCollection.findOne({ email: email });
		console.log("Item: ", item);
		if (!item) {
			res.status(404).json({ message: "Document not found!", poemId: poemId });
			client.close();
			return;
		}

		result = await usersCollection.updateOne(
			{ email: email },
			{ $pull: { poems: { poemId: poemId } } },
		);
		
	} catch (error) {
		res.status(404).json({ message: "Could not delete document!", error: error.message });
		client.close();
		return;
	}

	res.status(200).json({ message: "Document deleted!", poemId: poemId});
	client.close();
}

export default handler;








