import { connectToDatabase } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';

async function handler(req, res) {

	let client;

	if (req.method === 'POST') {
		

		const data = req.body;
		const { email, password } = data;
		let { name } = data;

		if (!name) {
			name = 'Unknown'
		};

		name = name.trim();

		const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!email || email.length > 40 || !regex.test(email) ||
			!password || password.trim().length < 6 ||
			password.trim().length > 16 || name.length > 40 ) {

			res.status(422).json({
				message: 'Invalid input.'
			})
			return;
		}
	
		let slug = name.replace(/ /g, "-");

		client = await connectToDatabase();

		const db = client.db();

		const existingUser = await db.collection('poets').findOne({email : email});
		if (existingUser) {
			res.status(423).json({
				message: "User already exists!"
			})

			client.close();
			return;
		}

		const userWithSlug = await db.collection('poets').findOne({slug: slug});

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

		const hashedPassword = await hashPassword(password);

		try {
			const result = await db.collection('poets').insertOne({
				slug: slug,
				name: name,
				email: email,
				password: hashedPassword,
				poems: [],
				isFeatured: true,
				readingList: [],
				imageUrl: 'https://firebasestorage.googleapis.com/v0/b/noontide-poetry.appspot.com/o/images%2F606e8d3731b25212fed45762sun-logo-bw.png?alt=media&token=73ad77af-c85a-43b6-b2fe-5e35b1f96103'
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




