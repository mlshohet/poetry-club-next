import { Fragment } from 'react';
import Head from 'next/head';

import { getSession } from 'next-auth/client';

import { TextEditorContextProvider } from '../store/text-editor-context';
import Poems from '../components/profile/poems';

import { getPoet } from '../lib/poets-utils';

function PoemsPage(props) {
	const { user, session } = props;
	const poems = user.poems.reverse();

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
	    	<TextEditorContextProvider >
		  			<Poems poems={poems} session={session} />
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

	const email = session.user.email;
	const userName = email.slice(0, email.indexOf("@"));
	const user = await getPoet(email);

	return {
		props: { session, user: user.poet }
	}
}

export default PoemsPage;

