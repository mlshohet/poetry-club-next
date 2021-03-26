import MongoClient from 'mongodb';

async function handler(req, res) {

	const uname = req.query.poetId;
	let client;

	if (req.method === "GET") {
		console.log("Uname:", uname);

		try {
			client = await MongoClient.connect(
				''
			);
		} catch (err) {
			res.status(400).json({
				message: "Could not connect to database"
			});
			return;
		}

		try {

			const db = client.db();
			let poets;
			if (uname === 'all') {
				const cursor = await db.collection("poets").find({});
				poets = await cursor.toArray();
			} else {
				poets = await db.collection("poets").findOne({ userName: uname});
			}

			res.status(201).json({
				poets: poets
			});

		} catch (error) {
			res.status(500).json({
				message: "Something went wrong"
			});
			client.close();
			return;
		}
	}

	if (req.method === "POST") {
			
			const { text, date, poemId } = req.body;
			const poemDocument = { text, date, poemId };

			if (!text || text === {}) {
				res.status(422).json({ message: 'Invalid input' });
				return;
			}

			let result;

			try {
				client = await MongoClient.connect(
						'');
			} catch (err) {
				res.status(400).json({
					message: "Could not connect to database"
				});
				return;
			}

			try {
				const db = client.db();
				const poets = db.collection("poets");
				const query = { userName: uname };
				const updateDocument = { $push: { "poems": poemDocument }};
				result = await poets.updateOne(query, updateDocument);
				res.status(201).json({
					message: 'Successfully stored poem',
					poem: poemDocument
				});
			} catch (error) {
				res.status(400).json({
					message: "Something went wrong"
				});
				client.close();
				return;
			}
	};

			await client.close();
}

export default handler;



