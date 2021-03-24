import { Fragment } from 'react';

import MainNavigation from '../../components/layout/main-navigation';
import Footer from '../../components/layout/footer';
import PoemsGrid from '../../components/poems/poem-detail/poems-grid';

import { getPoet } from '../../lib/poets-utils';

function PoetPage(props) {
	const { name, poems } = props;
	console.log("Prosps:", props);

	if (!poems) {
		return (
			<Fragment>
				<div className="center">
					<p>Loading...</p>
				</div>
			</Fragment>
		);
	}

	return (
		<Fragment>
			<MainNavigation />
			<div>
				<PoemsGrid 
					key={poems.poemId}
					name={name}
					poems={poems}/>
			</div>
			<Footer />
		</Fragment>
	);
};

export async function getStaticProps(context) {
	const { params } = context;
	const poetId = params.poetId;

	console.log("PoetId: ", poetId);
	
	const data = await getPoet(poetId);
	console.log("data: ", data);
	
	const name = data.poets.name;
	console.log("Poet name: ", name);
	const poems = data.poets.poems.reverse();

	return {
		props: {
			name: name,
			poems: poems,
		},
	};
};

export async function getStaticPaths() {
	const data = await getPoet("all");
	const poets = data.poets;
	console.log("Poets from getStaticPaths: ", poets );

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





