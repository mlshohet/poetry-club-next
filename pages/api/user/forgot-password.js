const nodemailer = require('nodemailer');

import { connectToDatabase } from '../../../lib/db';

import { hashPassword } from '../../../lib/auth';

const emailAPI = process.env.EMAIL_API;

async function handler(req, res) {

	if (req.method !== 'PATCH') {
		res.status(400).json({
			message: "Invalid request"
		});
		return;
	}

	const { email } = req.body;

	let client;
	try {
		client = await connectToDatabase();
	} catch (error) {
		res.status(401).json({ message: 'Could not connect' });
		client.close();
		return;
	}

	const collection = client.db().collection('poets');

	const passCode = "noontide"+Math.floor(Math.random()*100000);
	const hashedPassCode = await hashPassword(passCode);

	try {
		const result = await collection.updateOne(
			{ email: email },
			{ $set: { password: hashedPassCode }}
		);
	} catch (error) {
		res.status(400).json("Could not find profile.");
		client.close();
		return;
	}

	// Emailing the code
	// Nodemailer

	const transporter = nodemailer.createTransport({
		host: 'smtp.sendgrid.net',
		port: 587,
		auth: {
				user: 'apikey',
				pass: emailAPI,
		},
	});

	transporter.verify(function(error, success) {
		if (error) {
			console.log(error);
		} else {
			console.log("Server is ready");
		}
	});

	try {
		let info = await transporter.sendMail({
			from: 'noontidepoetryclub@gmail.com',
			to: email,
			subject: "Noontide Poetry Club password change request.",
			text: `Use this code - ${passCode} - in the password field to log in and change your password. This email was sent by a computer that doesn't exist. Please don't reply. The passcode expires in 48 hours. Happy writing!`,
		});

		res.status(200).json({ message: "Email sent "});
		console.log("Email sent");
		return;

	} catch (error) {
		res.status(400).json({ message: "Could not send email", error });
		return;
	}

	res.status(200).json({ message: "Emailed passcode."});
	client.close();
	return;
}

export default handler;








