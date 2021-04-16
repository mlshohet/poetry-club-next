import { ObjectId } from 'mongodb';

import { getSession } from 'next-auth/client';

import Account from '../components/profile/account/account';

import { connectToDatabase } from '../lib/db';

function AccountPage(props) {
	const { user, session } = props;
	if (!user || !session) {
		return <h1>Loading</h1>
	}

	return (
		<Account user={user} session={session} />
	)
};

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
		}
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

	return {
		props: { session, user: poet }
	}
};


export default AccountPage;