import FeaturedPoetsItem from './featured-poets-item';

import { getFeaturedPoets } from '../../lib/poets-utils';

import classes from './featured-poets-grid.module.css';

function FeaturedPoetsGrid(props) {
	const { poets } = props;
	console.log("Poets from grid: ", poets);
	return (
		<div>
			<h1 className={classes.name}>
					Featured		
			</h1>
			<div className={classes.grid}>
				{
					poets.map(poet =>
						<FeaturedPoetsItem 
							key={poet._id}
							userName={poet.userName}
							name={poet.name}
							imageUrl={poet.imageUrl}
							poems={poet.poems} 
						/>
					)

				}
			</div>
		</div>
	);
}

export default FeaturedPoetsGrid;