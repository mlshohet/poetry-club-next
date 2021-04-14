import { Fragment } from 'react';
import Head from 'next/head';

import { getSession } from 'next-auth/client';

import { TextEditorContextProvider } from '../store/text-editor-context';
import Poems from '../components/profile/poems';
import Loading from '../components/loading';

import { getPoet } from '../lib/poets-utils';

function PoemsPage(props) {
	const { user, session, poems } = props;

	if (!poems) {
		return (
			<Loading />
		)
	}

    return (
    	<Fragment>
	    	<Head>
				<title>Submit a Poem</title>
				<meta 
					name="Poems Dashboard"
					content="Poems dashboard"
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
		throw new Error("Could not find poet.");
		return;
	}

	const poems = user.poet.poems.reverse();

	return {
		props: { session, user: user.poet, poems: poems }
	}
}

export default PoemsPage;

