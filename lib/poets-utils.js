import React from 'react';

export async function getPoet(poetId) {
		
		const response = await fetch(`http://localhost:3000/api/${poetId}`);
			
		const data = await response.json();

		if (!response.ok) {
			throw new Error("Something went wrong");
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

