export async function getAllPoets() {
		let data;
		try {
			const response = await fetch(`https://noontide-poetry-club.netlify.app/api/poets`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			});
			
			data = await response.json();


			if (!response.ok) {
				throw new Error("Something went wrong");
				return;
			}
		} catch (error) {
			throw new Error(error.message);
			return;
		}

		return data;
};


export async function getPoet(slug) {
		let data;
		try {
			const response = await fetch(`https://noontide-poetry-club.netlify.app/api/poets/${slug}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			});
			
			data = await response.json();


			if (!response.ok) {
				throw new Error("Something went wrong");
				return;
			}
		} catch (error) {
			throw new Error(error.message);
			return;
		}

		return data;
};

export async function getFeaturedPoets() {

	let data;

		try {
			const response = await fetch(`http://localhost:3000/api/poets/get-featured-poets`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			});

			data = await response.json();

			if (!response.ok) {
				throw new Error("Could not get poets!");

			}
		} catch(error) {
			throw new Error(error.message);
			return;
		}
		
		return data.poets;
};

export async function getReadingListPoets(readingList) {

		let data;
		try {
			const response = await fetch(`/api/get-reading-list/${readingList}`);

			data = await response.json();

			if (!response.ok) {
				throw new Error("Could not get reading list!");

			}
		} catch(error) {
			throw new Error(error.message);
			return;
		}
		
		return data;
	}


