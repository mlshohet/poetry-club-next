import MongoClient from 'mongodb';

const handler = async (req, res) => {

	if (req.method === "GET") {

		let uname = req.query.poetId;
		console.log("Uname:", uname);
		

		let client;

		try {
				client = await MongoClient.connect(
					''
				);

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
			res.status(400).json({
				message: "Something went wrong"
			});
		}

		await client.close();
	}

	if (req.method === "POST") {

			const uname = req.query.poetId;
			const { title, text, date } = req.body;
			const poemDocument = { title, text, date };

			let client;
			try {
				client = await MongoClient.connect(
						'');
			
				const db = client.db();
				const poets = db.collection("poets");
				const query = { userName: uname };
				const updateDocument = { $push: { "poems": poemDocument }};

				const result = await poets.updateOne(query, updateDocument);
			} catch (error) {
				res.status(400).json({
					message: "Something went wrong"
				})
			}

			res.status(201).json({
					message: 'Successfully stored poem',
					userMessage: poemDocument
				});

			await client.close();
	};
}

export default handler;



