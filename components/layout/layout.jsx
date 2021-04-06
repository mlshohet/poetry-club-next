import { Fragment, useContext } from 'react';
import MainNavigation from './main-navigation';

import ProfileDropdownContext from '../../store/profile-dropdown-context';

import Footer from './footer';

import classes from './layout.module.css';

function Layout(props) {

	const { auth, home } = props;

	const profileDropdownContext = useContext(ProfileDropdownContext);
	
	const profileHidden = profileDropdownContext.profile;
	const hideProfileDropdown = profileDropdownContext.hideProfile;

	return (
		<Fragment>
				<MainNavigation 
					home={home} 
					auth={auth}
				/>
				<main
					className={
						auth ? classes.auth :
						classes.layout
					}
					onClick={
					!profileHidden ? hideProfileDropdown : null
				}>
					{props.children}
				</main>
				<Footer
					onClick={hideProfileDropdown}
					home={props.home}
					auth={props.auth}
				/>
		</Fragment>
	);
};

export default Layout;