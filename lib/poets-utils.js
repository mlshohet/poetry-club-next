export async function getPoet(poetId) {
		const url = `http://localhost:3000/api/${poetId}`;
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Something went wrong");
			}
			const data = await response.json();
			console.log("PoetId: ", poetId );
			console.log("Data", data);
			console.log("Data ID: ", data.poets._id);
			return data;
		} catch(err) {
			console.log(err);
			throw new Error("Something went wrong");
		}
};

export async function getFeaturedPoets() {
	const data = await getPoet("all");
	const poets = data.poets;

	console.log("Poets from utils:", poets);

	const featuredPoets = poets.filter(poet =>
		poet.isFeatured
	);

	return featuredPoets;
};

