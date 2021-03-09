import { Fragment } from 'react';

import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';

const DUMMY_POSTS = [
	{
		slug: 'getting-started', 
		title:'Getting Started', 
		image:'getting-started.png', 
		excerpt: 'NextJS is a react blah blah fuck you', 
		date: '2022-02-10'
	},
	{
		slug: 'getting-started2', 
		title:'Getting Started', 
		image:'getting-started.png', 
		excerpt: 'NextJS is a react blah blah fuck you', 
		date: '2022-02-10'
	},
	{
		slug: 'getting-started3', 
		title:'Getting Started', 
		image:'getting-started.png', 
		excerpt: 'NextJS is a react blah blah fuck you', 
		date: '2022-02-10'
	},
	{
		slug: 'getting-started4', 
		title:'Getting Started', 
		image:'getting-started.png', 
		excerpt: 'NextJS is a react blah blah fuck you', 
		date: '2022-02-10'
	}
];

function HomePage() {

	return (
		<Fragment>
			<Hero />
			<FeaturedPosts posts={DUMMY_POSTS} />
		</Fragment>
	);
};

export default HomePage;

//1) hero section => present yourself
//2) featured posts
//3) lean homepages, no styles, use other components for that