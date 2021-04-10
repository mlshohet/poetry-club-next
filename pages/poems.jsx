import { Fragment } from 'react';
import Head from 'next/head';

import { getSession } from 'next-auth/client';

import { TextEditorContextProvider } from '../store/text-editor-context';
import Poems from '../components/profile/poems';

import { getPoet } from '../lib/poets-utils';

function PoemsPage(props) {
	const { user, session, poems } = props;

	if (!user) {
		return (
			<h1> Loading </h1>
		)
	}

    return (
    	<Fragment>
	    	<Head>
				<title>Submit a Poem</title>
				<meta 
					name="description"
					content="Submit a poem"
				/>
				<meta charset="utf-8" />
			</Head>
	    	<TextEditorContextProvider>
		  			<Poems poems={poems} session={session} user={user} />
	  		</TextEditorContextProvider>
  		</Fragment>
  	)
}

export async function getServerSideProps(context) {
	const session = await getSession({
		req: context.req
	});

	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		};
	}

	const userId = session.user.userId;
		
	let user;
	try {
		user = await getPoet(userId);
	} catch (error) {
		console.log(error, "Failed to get user");
	}

	console.log(user);
	const poems = user.poet.poems.reverse();


	return {
		props: { session, user: user.poet, poems: poems }
	}
}

export default PoemsPage;

