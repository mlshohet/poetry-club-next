import { Fragment } from 'react';
import Head from 'next/head';

import FeaturedPoets from '../components/home-page/featured-poets';
import Hero from '../components/home-page/hero';

import { getFeaturedPoets } from '../lib/poets-utils';

function HomePage(props) {
	return (
		<Fragment>
			<Head>
				<title>Noontide Poetry Club</title>
				<meta 
					name="description"
					content="Noontide Poetry Club"
				/>
			</Head>
			<Hero />
			<FeaturedPoets poets={props.poets} />
		
		</Fragment>
	);
};

export async function getStaticProps() {
	const featuredPoets = await getFeaturedPoets();

	return {
		props: {
			poets: featuredPoets
		},
		revalidate: 600
	};
};

export default HomePage;

//1) hero section => present yourself
//2) featured posts
//3) lean homepages, no styles, use other components for that