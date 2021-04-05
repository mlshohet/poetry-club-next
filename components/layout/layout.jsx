import { Fragment, useContext } from 'react';
import MainNavigation from './main-navigation';

import ProfileDropdownContext from '../../store/profile-dropdown-context';

import Footer from './footer';

function Layout(props) {

	const profileDropdownContext = useContext(ProfileDropdownContext);
	
	const profileHidden = profileDropdownContext.profile;
	const hideProfileDropdown = profileDropdownContext.hideProfile;

	return (
		<Fragment >
			<div onClick={
				!profileHidden ? hideProfileDropdown : null
			}
			>
				<MainNavigation 
					home={props.home}
					auth={props.auth}
				/>
				<main onClick={hideProfileDropdown}>
					{props.children}
				</main>
				<Footer
					onClick={hideProfileDropdown}
					home={props.home}
					auth={props.auth}
				/>
			</div>
		</Fragment>
	);
};

export default Layout;