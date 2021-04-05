import { useState, useContext } from 'react';

import Link from 'next/link';
import { useSession } from 'next-auth/client';

import Logo from './logo';
import ProfileDropdown from '../profile/profile-dropdown';

import ProfileDropdownContext from '../../store/profile-dropdown-context';

import classes from './main-navigation.module.css';

function MainNavigation(props) {
	const [session, loading] = useSession();

	const profileDropdownContext = useContext(ProfileDropdownContext);
	
	const profileHidden = profileDropdownContext.profile;
	const showProfileDropdown = profileDropdownContext.showProfile;
	const hideProfileDropdown = profileDropdownContext.hideProfile;



	const { home, auth } = props;
	
	return (
		<header
			className={
				auth ? classes.noHeader :
					home ? classes.mainHeader : 
							classes.plainHeader
			}
		>
			<div className={classes.head}>
				<Link href='/'>
					<a>
						<Logo home={home} />
					</a>
				</Link>
				<Link href='/'>
					<a>
						<div className={
								home ? classes.titleContainer : classes.plainTitleContainer
							}
						>
							<div className={classes.title}>
								noontide
							</div>
							<div className={classes.secondLine}>
								poetry club
							</div>
						</div>
					</a>						
				</Link>
			</div>
			<nav 
				className={
					home ? 
					classes.navigation : 
					classes.plainNav
			}
			>
				{
					!session && (
						<div>
							<Link href='/auth'><a>login</a></Link>
						</div>
					)
				}
      			{
      				session && (
		      				<div  
		      					onClick={
		      						profileHidden ?
		      						showProfileDropdown :
		      						hideProfileDropdown
		      					}
		      				>
	        						<a>profile</a>
	      					</div>
      				)
      			}
			</nav>
			{
				!profileHidden && <ProfileDropdown />
			}
		</header>
	);
};

export default MainNavigation;



