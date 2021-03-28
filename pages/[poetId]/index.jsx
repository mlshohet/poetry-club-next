import { Fragment } from 'react';
import PoemsGrid from '../../components/poems/poem-detail/poems-grid';

import { getPoet } from '../../lib/poets-utils';

function PoetPage(props) {
	const { name, poems } = props;
	console.log("Prosps:", props);

	if (!name || !poems) {
		return (
			<h1>Loading</h1>
		);
	}

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
	const data = await getPoet("all");
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





