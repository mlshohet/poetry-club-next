import { Fragment, useEffect } from 'react';

import Head from 'next/head';
import { useSession } from 'next-auth/client';

import MainNavigation from '../components/layout/main-navigation';
import Hero from '../components/home-page/hero';
import FeaturedPoets from '../components/home-page/featured-poets';
import CTA from '../components/home-page/cta';
import CtaAdd from '../components/home-page/cta-add';

import { getFeaturedPoets } from '../lib/poets-utils';

function HomePage({ poets }) {

	const [session, loading] = useSession();
	const poetNamesArr = poets.map(poet => poet.name);
	const poetNames = poetNamesArr.join(); 

	return (
		<Fragment>
			<Head>
				<meta 
					name="descritpion"
					content={`featuring - ${poetNames}`}
				/>
			</Head>
			<Hero />
			<FeaturedPoets poets={poets} />
			{
				!session ? <CTA /> : <CtaAdd />
			}
		</Fragment>
	);
};

export async function getStaticProps() {
	const home = true;
	const featuredPoets = await getFeaturedPoets();

	const sortedFeaturedPoets = featuredPoets.reverse();

	return {
		props: {
			poets: sortedFeaturedPoets,
			home: home
		},
		revalidate: 600
	};
};

export default HomePage;

//1) hero section => present yourself
//2) featured posts
//3) lean homepages, no styles, use other components for that