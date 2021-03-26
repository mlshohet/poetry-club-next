import { Fragment } from 'react';
import { getSession } from 'next-auth/client';

import MainNavigation from '../components/layout/main-navigation';
import UserProfile from '../components/profile/user-profile';

function ProfilePage() {
  return (
  	<Fragment>
  		<UserProfile />
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

	return {
		props: { session }
	}
}

export default ProfilePage;

