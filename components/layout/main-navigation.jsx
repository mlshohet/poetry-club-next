import { useState, useContext } from 'react';

import Link from 'next/link';
import { useSession } from 'next-auth/client';

import MenuIcon from '@material-ui/icons/Menu';

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
			onClick={
				!profileHidden ? hideProfileDropdown : null
			}
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
			>{
					!session && (
						<Link href='/auth'>
							<a>
								<div  
									className={
										home ? 
										classes.login :
										classes.plainLogin
									}
								>login
								</div>
							</a>
						</Link>
					)
				}
				<div className={classes.profile}>
				{
      				session && (
		      				<div onClick={
		      						profileHidden ?
		      						showProfileDropdown :
		      						hideProfileDropdown
		      					}
		      				>
	        						<a>profile</a>
	      					</div>
      				)
      			}
      			</div>
      			<div className={classes.profileIcon}>
				{
      				session && (
		      				<div onClick={
		      						profileHidden ?
		      						showProfileDropdown :
		      						hideProfileDropdown
		      					}
		      				>
	        						<a><MenuIcon /></a>
	      					</div>
      				)
      			}
      			</div>

			</nav>
			{
				!profileHidden && <ProfileDropdown />
			}
		</header>
	);
};

export default MainNavigation;



