import { Fragment } from 'react';
import PoemsGrid from '../../components/poems/poem-detail/poems-grid';

import { getPoet } from '../../lib/poets-utils';

function PoetPage(props) {

	if (!props) {
		return (
			<h1>Loading</h1>
		);
	}

	const { name, poems } = props;
	console.log("Prosps:", props);

	

	return (
		<Fragment>
			<div>
				<PoemsGrid 
					key={poems.poemId}
					name={name}
					poems={poems}/>
			</div>

		</Fragment>
	);
};

export async function getStaticProps(context) {
	const { params } = context;
	const poetId = params.poetId;
	

	const data = await getPoet(poetId);
	
	const name = data.poet.name;
	const poems = data.poet.poems.reverse();

	return {
		props: {
			name,
			poems,
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
		fallback: true
	};
};


export default PoetPage;





