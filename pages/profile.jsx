import { Fragment } from 'react';
import { getSession } from 'next-auth/client';

import { TextEditorContextProvider } from '../store/text-editor-context';
import UserProfile from '../components/profile/user-profile';
import Poems from '../components/profile/poems';

import { getPoet } from '../lib/poets-utils';

function ProfilePage(props) {
	const { user } = props;

    return (
    	<TextEditorContextProvider >
	  			<Poems poet={user} />
  		</TextEditorContextProvider>
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
	const user = await getPoet(userName);

	return {
		props: { session, user: user.poet }
	}
}

export default ProfilePage;

