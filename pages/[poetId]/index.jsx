import { Fragment } from 'react';

import MainNavigation from '../../components/layout/main-navigation';
import Footer from '../../components/layout/footer';
import PoemsGrid from '../../components/poems/poem-detail/poems-grid';

import { getPoet } from '../../lib/poets-utils';

function PoetPage(props) {
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
	
	const name = data.poets.name;
	const poems = data.poets.poems.reverse();

	return {
		props: {
			name,
			poems,
		},	
	};
};

export async function getStaticPaths() {
	const data = await getPoet("all");
	const poets = data.poets;

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





