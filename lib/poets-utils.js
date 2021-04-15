import React from 'react';

export async function getPoet(slug) {

		let data;
		try {
			const response = await fetch(`https://noontide-poetry-club.vercel.app/api/${slug}`);
			
			data = await response.json();

			if (!response.ok) {
				throw new Error("Something went wrong");
				return;
			}
		} catch (error) {
			console.log(data, error);
			return;
		}

		return data;
};

export async function getFeaturedPoets() {
	const data = await getPoet("all");
	const poets = data.poet;

	const featuredPoets = poets.filter(poet =>
		poet.isFeatured
	);

	return featuredPoets;
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
			console.log(error, data);
			return;
		}
		
		return data;
	}


