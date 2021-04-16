import { Fragment } from 'react';
import Head from 'next/head';

import { ObjectId } from 'mongodb';

import { getSession } from 'next-auth/client';

import { TextEditorContextProvider } from '../store/text-editor-context';
import Poems from '../components/profile/poems';
import Loading from '../components/loading';

import { connectToDatabase } from '../lib/db';

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

	const userId = await new ObjectId(session.user.userId);

	let client;

	try {
		client = await connectToDatabase();
	} catch (err) {
		throw new Error("Could not connect");
		client.close();
		return;
	}

	const collection = client.db().collection('poets');
	
	let data;

	try {
		data = await collection.findOne({ _id: userId });
	} catch (error) {
		throw new Error("Could not find profile.");
		client.close();
		return;
	}

	client.close();

	const poet = { 
		_id: data._id.toString(),
		slug: data.slug,
		name: data.name,
		email: data.email,
		poems: data.poems,
		isFeatured: data.isFeatured,
		readingList: data.readingList,
		imageUrl: data.imageUrl,
	}
	
	const poemsSorted = poet.poems.reverse();

	return {
		props: { session, user: poet, poems: poemsSorted }
	}
}

export default PoemsPage;

