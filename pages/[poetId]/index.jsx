import { Fragment, useEffect, useState } from 'react';

import { useSession } from 'next-auth/client';


import PoemsGrid from '../../components/poems/poem-detail/poems-grid';

import { getPoet } from '../../lib/poets-utils';

function PoetPage({ poet, poemsSorted }) {
	const [isLoading, setIsLoading] = useState(false);

	if (!poet) {
		setIsLoading(true);
		return (
			<h1>Loading</h1>
		);
	}

	return (
		<Fragment>
			<div>
		
				<PoemsGrid poet={poet} poems={poemsSorted} />
	
			</div>
		</Fragment>
	);
};

export async function getStaticProps(context) {

	const { params } = context;
	console.log("Params: ", context);

	const poetId = params.poetId;
	
	let data;

	try {
		data = await getPoet(poetId);
	} catch (error) {
		console.log(error);
		return;
	}
	
	const poet = data.poet;
	const poems = poet.poems;
	const poemsSorted = poems.reverse();

	return {
		props: {
			poet,
			poemsSorted,
		},	
	};
};

export async function getStaticPaths() {
	
	let data;
	try {
		data = await getPoet("all");
	} catch (error) {
		console.log(error, "Could not get data!");
	}
	
	const poets = data.poet;

	const poetUserNames = poets.map(poet => poet.userName);

	const pathsWithParams = poetUserNames.map(poetUserName => ({
		params: {
			poetId: poetUserName
		}
	}));

	return {
		paths: pathsWithParams,
		fallback: false
	};
};


export default PoetPage;





