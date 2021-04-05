import { useEffect } from 'react';
import Head from 'next/head';
import { Provider } from 'next-auth/client';

import { ProfileDropdownContextProvider } from '../store/profile-dropdown-context';

import useScrollRestoration from '../lib/useScrollRestoration';

import '../styles/globals.css'
import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps, router }) {

	useEffect(() => {
	    if (process.env.NODE_ENV === 'production') {
	      analytics();
	    }
	  }, [])

	useScrollRestoration(router);

  	return (
  		<Provider session={pageProps.session}>
  		<ProfileDropdownContextProvider>
		  	<Layout 
		  		home={pageProps.home}
		  		auth={pageProps.auth}
		  	>
		  		<Head>
		  			<meta 
		  				name="viewport" 
		  				content="width=device-width, initial-scale=1.0"
		  			/>
		  		</Head>
		  		<Component {...pageProps} />
		  	</Layout>
		  </ProfileDropdownContextProvider>
		</Provider>
  	);
};

export default MyApp;
