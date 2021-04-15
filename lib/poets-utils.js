import React from 'react';

export async function getPoet(slug) {

		let data;
		try {
			const response = await fetch(`/api/poets/${slug}`, {
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
			throw new Error(error.message);
			return;
		}
		
		return data;
	}


