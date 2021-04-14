import { Fragment } from 'react';

import Link from 'next/link';
import Head from 'next/head';

import Image from 'next/image';

import BookShop from './book-shop';
import BookItem from './book-item';

import classes from './hero.module.css';

function Hero() {
	return (
		<Fragment>
		<section className={classes.hero}>
			<div className={classes.featured}>
				<span className={classes.caption}>Noontide Spotlight</span>
				<div className={classes.title}>Stevie Smith</div>
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
				She uses an ironic playfulness, economy of style and uncanny technique to sketch out the senselessness and the darkness of the human experience. 
				Her work revolutionaized the form and advanced it into a new age.
				</p>
				<br />
				<p>
		
					Read some of <Link href="/Stevie-Smith">
						<span className={classes.stevie}>Stevie Smith</span>
						</Link>'s poems on <span className={classes.noontide}>
						noontide</span> and then make sure to buy a collection.
				</p>
			</div>
		</section>
		<BookShop />
		</Fragment>
	);
};

export default Hero;