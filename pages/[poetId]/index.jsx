import { Fragment } from 'react';

import PoemsGrid from '../../components/poems/poem-detail/poems-grid';
import classes from './poet.module.css';

import { getPoet } from '../../lib/poets.utils';

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
		<div>
			<h1 className={classes.name}>
				{name.first} {name.last}
			</h1>
			<div>
				<PoemsGrid key={new Date()} poems={poems}/>
			</div>
		</div>
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
	const poems = data.poets.poems;

	return {
		props: {
			name: name,
			poems: poems,
		},

		revalidate: 1800
	};
};

export async function getStaticPaths() {
	const data = await getPoet("all");
	const poets = data.poets;
	console.log("Poets from getStaticPaths: ", poets );

	const poetNames = poets.map(poet => poet.userName);

	const pathsWithParams = poetNames.map(poetName => ({
		params: {
			poetId: poetName
		}
	}));

	return {
		paths: pathsWithParams,
		fallback: false
	};
};


export default PoetPage;





