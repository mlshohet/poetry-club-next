import { Fragment, useEffect } from 'react';

import { useSession } from 'next-auth/client';
import Head from 'next/head';
import MainNavigation from '../components/layout/main-navigation';
import Hero from '../components/home-page/hero';
import FeaturedPoets from '../components/home-page/featured-poets';
import CTA from '../components/home-page/cta';

import { getFeaturedPoets } from '../lib/poets-utils';

function HomePage({ poets }) {

	const [session, loading] = useSession();
	console.log("session: ", session);

	if (!poets) {
		return <h1>Loading</h1>
	};

	return (
		<Fragment>
			<Head>
				<title>Noontide Poetry Club</title>
				<meta 
					name="description"
					content="Noontide Poetry Club, Poetry Community"
				/>
			</Head>
			<Hero />
			<FeaturedPoets poets={poets} />
			<CTA />
		</Fragment>
	);
};

export async function getStaticProps(context) {
	const home = true;
	const featuredPoets = await getFeaturedPoets();
	console.log("from Static props on page");

	return {
		props: {
			poets: featuredPoets,
			home: home
		},
	};
};

export default HomePage;

//1) hero section => present yourself
//2) featured posts
//3) lean homepages, no styles, use other components for that