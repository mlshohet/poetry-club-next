import Image from 'next/image';

import classes from './hero.module.css';

function Hero() {
	return (
		<section className={classes.hero}>
			<div className={classes.image}>
				<Image   
					src="/images/site/mikeface.jpg"
					alt="image showing Mike"
					width={300}
					height={300}
				/>
			</div>
			<h1>
				Hi, I'm Mike
			</h1>
			<p>
				I blog about web dev. Blah blah blah...
			</p>
		</section>
	);
};

export default Hero;