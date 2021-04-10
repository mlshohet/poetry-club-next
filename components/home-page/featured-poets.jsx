import FeaturedPoetsGrid from '../featured-poets/featured-poets-grid';

import classes from './featured-poets.module.css';

function FeaturedPoets(props) {
	const {poets} = props;


	return (
		<div className={classes.featuredContainer}>
	
				<h1 className={classes.title}>
						Featured		
				</h1>
				<FeaturedPoetsGrid 
					poets={poets}
				/>
		</div>
	)
}

export default FeaturedPoets;