import { getSession } from 'next-auth/client';
import { connectToDatabase } from '../../../lib/db';
import { verifyPassword, hashPassword } from '../../../lib/auth';


async function handler(req, res) {

	if (req.method !== 'PATCH') {
		return;
	}

	const session = await getSession({ req: req });

	if (!session) {
		res.status(401).json({
			message: 'Unauthorized!'
		});
		return;
	}

	const userEmail = session.user.email;
	console.log("userEmail:", userEmail);

	const { oldPassword, newPassword } = req.body;

	console.log("Passwords: ", oldPassword, newPassword);

	let client;
	try {
		client = await connectToDatabase();
	} catch (error) {
		res.status(400).json({message: "Could not connect"});
		client.close();
		return;
	}
	

	const usersCollection = client.db().collection('poets');

	let user;
	try {
		user = await usersCollection.findOne({email: userEmail});
		console.log("user: ", user);
	} catch (error) {
		res.status(404).json({ message: "User not found in database!"});
		client.close();
		return;
	}
	

	if (!user) {
		res.status(404).json({ message: "User not found!"});
		client.close();
		return;
	}

	const currentPassword = user.password;
	let passwordsAreEqual;

	try {
		console.log("Current Passwords: ", oldPassword, currentPassword);
		passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);
	} catch (error) {
		res.status(403).json({ message: "Password not valid!"});
		client.close();
		return;
	}

	if (!passwordsAreEqual) {
		res.status(403).json({ message: "Password invalid!" });
		client.close();
		return;
	}

	const hashedPassword = await hashPassword(newPassword);

	const result = await usersCollection.updateOne(
		{ email: userEmail }, 
		{ $set: { password: hashedPassword }}
	);

	client.close();
	res.status(200).json({ message: "Password updated" });

}

export default handler;









