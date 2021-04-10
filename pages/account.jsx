import { getSession } from 'next-auth/client';

import Account from '../components/profile/account/account';

import { getPoet } from '../lib/poets-utils';

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

	const userId = session.user.userId;
	const user = await getPoet(userId);

	return {
		props: { session, user: user.poet }
	}
};


export default AccountPage;