import { Fragment } from 'react';
import Head from 'next/head';

import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';

import { getFeaturedPosts } from '../lib/posts-util';


function HomePage(props) {

	return (
		<Fragment>
			<Head>
				<title>Blog</title>
				<meta 
					name="description"
					content="Posts about shite"
				/>
			</Head>
			<Hero />
			<FeaturedPosts posts={props.posts} />
		</Fragment>
	);
};

export async function getStaticProps() {
	const featuredPosts = getFeaturedPosts();

	return {
		props: {
			posts: featuredPosts
		},
		revalidate: 60
	};
};

export default HomePage;

//1) hero section => present yourself
//2) featured posts
//3) lean homepages, no styles, use other components for that