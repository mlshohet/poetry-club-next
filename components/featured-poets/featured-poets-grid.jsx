import { Fragment } from 'react';

import Link from 'next/link';

import FeaturedPoetsItem from './featured-poets-item';

import { getFeaturedPoets } from '../../lib/poets-utils';

import classes from './featured-poets-grid.module.css';

function FeaturedPoetsGrid(props) {
	const { poets } = props;

	return (
		<div className={classes.gridContainer}>
		<div className={classes.grid}>
			{
				poets.map(poet =>
					(
						<FeaturedPoetsItem
							key={poet._id}
							slug={poet.slug}
							imageUrl={poet.imageUrl}
						/>
					)
				)
			}
		</div>
		</div>
	);
}

export default FeaturedPoetsGrid;