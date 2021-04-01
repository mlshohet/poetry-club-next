import { Fragment } from 'react';

import classes from './poem-item.module.css';

function PoemItem(props) {

	const { poem, date } = props;

	if(!poem) {
		return (
			<h1>Loading...</h1>
		)
	}

	let poemText = '';

	poem.map(line => {
		poemText = poemText.concat(line.text+'\n');
	});

	return (
		<Fragment>
			<div className={classes.outputContainer}>
				<div 
					className={classes.output}
				>
					{poemText}
				</div>
				<div className={classes.outputDate}
				>
					{date}
				</div>
			</div>
		</Fragment>
	);
};

export default PoemItem;



