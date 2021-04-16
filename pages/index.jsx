import { Fragment, useEffect, useState } from 'react';

import Head from 'next/head';
import { useSession } from 'next-auth/client';

import MainNavigation from '../components/layout/main-navigation';
import Hero from '../components/home-page/hero';
import FeaturedPoets from '../components/home-page/featured-poets';
import CTA from '../components/home-page/cta';
import CtaAdd from '../components/home-page/cta-add';
import Loading from '../components/loading';

import { connectToDatabase } from '../lib/db';

function HomePage(props) {
	const { poets, home } = props;

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

	let client;

	try {
		client = await connectToDatabase();
	} catch (err) {
		throw new Error("Could not connect to database");
		client.close();
		return;
	}

	const collection = client.db().collection('poets');
	
	let data;

	try {
		const cursor = await collection.find({ isFeatured: true });
		data = await cursor.toArray();
		} catch (error) {
			throw new Error('Could not return featured');
			client.close();
			return;
		}

		client.close();

		let poets = [];
		data.map(poet => {
			poets.push(
			{ 
				_id: poet._id.toString(),
				slug: poet.slug,
				name: poet.name,
				email: poet.email,
				poems: poet.poems,
				isFeatured: poet.isFeatured,
				readingList: poet.readingList,
				imageUrl: poet.imageUrl,
			})
		});

	const sortedFeaturedPoets = poets.reverse();

	return {
		props: {
			poets: sortedFeaturedPoets,
			home: home
		},
		revalidate: 600
	};
};

export default HomePage;
