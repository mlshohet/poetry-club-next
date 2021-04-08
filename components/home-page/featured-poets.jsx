import FeaturedPoetsGrid from '../featured-poets/featured-poets-grid';

import classes from './featured-poets.module.css';

function FeaturedPoets(props) {
	const {poets} = props;


	return (
		<div className={classes.featuredContainer}>
			<section className={classes.featured}>
				<h1 className={classes.title}>
						Featured		
				</h1>
				<FeaturedPoetsGrid 
					poets={poets}
				/>
				<FeaturedPoetsGrid 
					poets={poets}
				/>
				<FeaturedPoetsGrid 
					poets={poets}
				/>
				<FeaturedPoetsGrid 
					poets={poets}
				/>
			</section>
		</div>
	)
}

export default FeaturedPoets;