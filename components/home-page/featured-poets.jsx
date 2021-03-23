import FeaturedPoetsGrid from '../poets/featured-poets-grid';

import classes from './featured-poets.module.css';

function FeaturedPoets(props) {
	return (
		<section className={classes.latest}>
			<FeaturedPoetsGrid 
				poets={props.poets}
			/>
		</section>
	)
}

export default FeaturedPoets;