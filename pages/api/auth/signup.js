import { connectToDatabase } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';

async function handler(req, res) {

	let client;

	if (req.method === 'POST') {
		

		const data = req.body;
		const { email, password } = data;

		if (!email || !email.includes('@') ||
			!password || password.trim().length < 7) {

			res.status(422).json({
				message: 'Invalid input. Password should be at least 7 characters long.'
			})
			return;
		}

		const userName = email.slice(0, email.indexOf("@"));
		console.log("Username: ", userName);

		client = await connectToDatabase();

		const db = client.db();

		const existingUser = await db.collection('poets').findOne({email : email});
		if (existingUser) {
			res.status(422).json({
				message: "User already exists!"
			})

			client.close();
			return;
		}


		const hashedPassword = await hashPassword(password);

		try {
			const result = await db.collection('poets').insertOne({
				userName: userName,
				email: email,
				password: hashedPassword,
				poems: []
			});
		} catch (error) {
			res.status(400).json({
				message: "Could not create profile!"
			})
			client.close();
			return;
		}
		
		res.status(201).json({
			message: "Created profile!",
		});
	}

	client.close();
}

export default handler;




