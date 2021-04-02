import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import AuthForm from '../components/auth/auth-form';

function AuthPage(props) {

	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		getSession().then(session => {
			console.log("Session: ", session);
			if (session) {
				router.replace('/')
			} else {
				setIsLoading(false);
			}
		})
	}, [router]);

	if (isLoading) {
		return <h3>Loading...</h3>
	} 
	
	return <AuthForm />;
}

export async function getStaticProps() {
	  const auth = true;

	  return {
	    props: {
	      auth,
	    }
	  }
};

export default AuthPage;