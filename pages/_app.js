import { useEffect } from 'react';
import Head from 'next/head';
import { Provider } from 'next-auth/client';

import { analytics } from '../firebase/firebase.utils';

import { ProfileDropdownContextProvider } from '../store/profile-dropdown-context';
import { SignUpModeContextProvider } from '../store/sign-up-context';

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

  		<SignUpModeContextProvider>
  		<ProfileDropdownContextProvider>
  		<Provider session={pageProps.session}>
		  	<Layout 
		  		home={pageProps.home}
		  		auth={pageProps.auth}
		  	>
		  		<Head>
		  			<meta charSet="utf-8" />
		  			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
		  			<meta 
		  				name="viewport" 
		  				content="width=device-width, initial-scale=1.0"
		  			/>
		  			<title>Noontide Poetry Club</title>
		  			<meta
						name="description"
						content="community and resource for poets and poetry enthusiasts"
					/>

					<link rel="apple-touch-icon" sizes="180x180" href="/public/apple-touch-icon.png"></link>
					<link rel="icon" type="image/png" sizes="32x32" href="/public/favicon-32x32.png"></link>
					<link rel="icon" type="image/png" sizes="16x16" href="/public/favicon-16x16.png"></link>
					<link rel="manifest" href="/public/site.webmanifest"></link>
					<link rel="mask-icon" href="/public/safari-pinned-tab.svg" color="#880808"></link>
					<link rel="shortcut icon" href="/public/favicon.ico"></link>
					<meta name="apple-mobile-web-app-title" content="Noontide Poetry Club" />
					<meta name="application-name" content="Noontide Poetry Club" />
					<meta name="msapplication-TileColor" content="#880808" />
					<meta name="msapplication-config" content="/public/browserconfig.xml" />
					<meta name="theme-color" content="#880808" />
		  		</Head>
		  		
		  		<Component {...pageProps} />
		  	
		  	</Layout>
		  	</Provider>
		  </ProfileDropdownContextProvider>
		  </SignUpModeContextProvider>
  	);
};

export default MyApp;
