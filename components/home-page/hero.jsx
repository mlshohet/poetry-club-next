import { Fragment } from 'react';
import Image from 'next/image';

import BookShop from './book-shop';
import BookItem from './book-item';

import classes from './hero.module.css';

function Hero() {
	return (
		<Fragment>
		<section className={classes.hero}>
			<div className={classes.featured}>
				<span className={classes.caption}>Noontide Spotlight </span>
				<div className={classes.title}>Stevie Smith </div>
			</div>
			<div className={classes.image}>
				<Image   
					src="/images/site/Stevie-Smith.jpg"
					alt="Stevie Smith"
					width={400}
					height={400}
				/>
			</div>
			<div className={classes.blurb}>
				<p>Stevie Smith is one of the 20th century's most beloved and revered poets.
				She combines effortless word-play and economy of style with irony-laden commentary on social institutions and human behavior. 
				
					Her work revolutionaized the form and advanced it into
					a new age.
				</p>
				<br />
				<p>
		
					Read some of Stevie Smith's poems on <span className={classes.noontide}>noontide</span> and then make sure to buy a collection.
				</p>
			</div>
		</section>
		<BookShop />
		</Fragment>
	);
};

export default Hero;