import { useEffect } from 'react';

import Head from 'next/head';
import { Provider } from 'next-auth/client';

import useScrollRestoration from '../lib/useScrollRestoration';

import '../styles/globals.css'
import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps, router }) {

	useScrollRestoration(router);

  	return (
  		<Provider session={pageProps.session}>
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
		</Provider>
  	);
};

export default MyApp;
