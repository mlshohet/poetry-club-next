import { Fragment } from 'react';
import Head from 'next/head';

import MainNavigation from '../components/layout/main-navigation';
import Footer from '../components/layout/footer';
import Hero from '../components/home-page/hero';
import FeaturedPoets from '../components/home-page/featured-poets';
import CTA from '../components/home-page/cta';

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
			<MainNavigation home />
			<Hero />
			<FeaturedPoets poets={props.poets} />
			<CTA />
			<Footer home />
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