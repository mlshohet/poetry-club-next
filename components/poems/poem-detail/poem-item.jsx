import { Fragment, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import classes from './poem-item.module.css';

function PoemItem(props) {
	const { poem, date } = props;

	let poemText = '';

	poem.map(line => {
		poemText = poemText.concat(line.text+'\n');
	});

	return (
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
	);
};

export default PoemItem;



