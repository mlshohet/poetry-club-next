import { Fragment } from 'react';

import Link from 'next/link';

import FeaturedPoetsItem from './featured-poets-item';

import { getFeaturedPoets } from '../../lib/poets-utils';

import classes from './featured-poets-grid.module.css';

function FeaturedPoetsGrid(props) {
	const { poets } = props;

	return (
		<div className={classes.grid}>
			{
				poets.map(poet =>
					(
						<FeaturedPoetsItem
							key={poet._id}
							uname={poet.userName}
							imageUrl={poet.imageUrl}
						/>
					)
				)
			}
		</div>
	);
}

export default FeaturedPoetsGrid;