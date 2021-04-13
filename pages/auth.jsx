import { Fragment, useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import AuthForm from '../components/auth/auth-form';
import Loading from '../components/loading';

import classes from './auth.module.css';

function AuthPage(props) {

	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		getSession().then(session => {
			if (session) {
				router.replace('/')
			} else {
				setIsLoading(false);
			}
		})
	}, [router]);

	if (isLoading) {
		return <Loading />;
	}

	return ( 
			<AuthForm /> 
	);
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