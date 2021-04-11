import { getSession } from 'next-auth/client';
import { ObjectId } from 'mongodb';

import { connectToDatabase } from '../../../lib/db';

async function handler (req, res) {

	if(req.method !== 'PATCH') {
		return;
	}

	const session = await getSession({ req: req });

	console.log("Session from server: ", session);

	if (!session) {
		res.status(401).json({
			message: "Unauthorized!"
		});

		return;
	}

	const userId = session.user.userId;
	let { name } = req.body;

	const uid = new ObjectId(userId);

	name = name.trim();
	let slug = name.replace(/ /g, "-");

	let client;
	try {
		client = await connectToDatabase();
	} catch (error) {
		res.status(400).json({ error: error, message: "Could not connect!" });
		client.close();
		return;
	}

	const usersCollection = client.db().collection('poets');

	let user;
	try {
		user = await usersCollection.findOne({ _id: uid });
	} catch (error) {
		res.status(401).json({ message: "Could not find account." });
		client.close();
		return;
	}

	try {

		const result = await usersCollection.updateOne(
			{ _id : uid },
			{ $set: { name: name }}, 
		);

	} catch (error) {
		res.status(404).json({ error: error, message: "Could not update document!"});
		client.close();
		return;
	}

	const userWithSlug = await usersCollection.findOne({ slug: slug });

	if (userWithSlug) {
		const alreadyTakenSlug = userWithSlug.slug;
		const lastCharacter = alreadyTakenSlug[alreadyTakenSlug.length-1];
		if (!isNaN(lastCharacter)) {
			const suffix = +lastCharacter + 1;
			const slugArr = slug.split('');
			slugArr[slugArr.length-1] = suffix;
			slug = slugArr.join('');
		} else {
			slug = slug + 2;
		}
	};
	console.log("At slug part");
	try {
		const result = await usersCollection.updateOne(
			{ _id : uid },
			{ $set: { slug: slug }},
		);

	} catch (error) {
		res.status(404).json({ error: error, message: "Could not update document!"});
		client.close();
		return;
	}

	res.status(200).json({ message: "Name updated!"});
	client.close()
};

export default handler;








