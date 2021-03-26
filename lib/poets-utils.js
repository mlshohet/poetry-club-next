import React from 'react';

export async function getPoet(poetId) {
		const url = `http://localhost:3000/api/${poetId}`;
		
		const response = await fetch(url);
			
		const data = await response.json();

		if (!response.ok) {
			throw new Error("Something went wrong");
		}

		return data;
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

