import { Fragment } from 'react';
import MainNavigation from './main-navigation';
import Footer from './footer';

function Layout(props) {
	
	return (
		<Fragment>
			<MainNavigation 
				home={props.home}
				auth={props.auth}
			/>
			<main>{props.children}</main>
			<Footer 
				home={props.home}
				auth={props.auth}
			/>
		</Fragment>
	);
};

export default Layout;