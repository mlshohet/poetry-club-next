import { useContext } from 'react';

import { signOut } from 'next-auth/client';

import ProfileDropdownContext from '../../store/profile-dropdown-context';

import Link from 'next/link';

import classes from './profile-dropdown.module.css';

function ProfileDropdown (props) {

	const profileDropdownContext = useContext(ProfileDropdownContext);
	const hideProfileDropdown = profileDropdownContext.hideProfile;

	async function logoutHandler() {
		hideProfileDropdown;
		const result = await signOut();
	}

	return (
		<div className={classes.profileContainer}>
			<ul className={classes.profileList}>
				<li 
					className={classes.profileItem}
					onClick={hideProfileDropdown}
				>
					<Link href='/poems'>
						<a>
							Poems
						</a>
					</Link>
				</li>
				<li className={classes.profileItem}>
					<Link href='/reading-list'>
						<a>
							Reading List
						</a>
					</Link>
				</li>
				<li 
					className={classes.profileItem}
					onClick={hideProfileDropdown}
				>
					<Link href='/account'>
						Account
					</Link>
				</li>
				<li className={classes.profileItem}>
					<div 
						className={classes.logout}
						onClick ={logoutHandler}
					>
						Logout
					</div>
				</li>
			</ul>
		</div>
	)
};

export default ProfileDropdown;