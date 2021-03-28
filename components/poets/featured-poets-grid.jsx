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
							<Link key={poet.imageUrl} href={`/${poet.userName}`}>
								<a>
									<FeaturedPoetsItem
										imageUrl={poet.imageUrl}
									/>
								</a>
							</Link>
						)
					)
				}
			</div>
	);
}

export default FeaturedPoetsGrid;