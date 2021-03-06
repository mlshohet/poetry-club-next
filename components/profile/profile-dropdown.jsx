import { useState, useEffect, useContext } from 'react';

import { getSession, signOut } from 'next-auth/client';

import CreateIcon from '@material-ui/icons/Create';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import ProfileDropdownContext from '../../store/profile-dropdown-context';

import Link from 'next/link';

import { useRouter } from 'next/router';

import { getPoet } from '../../lib/poets-utils';

import Loading from '../../components/loading';

import classes from './profile-dropdown.module.css';

function ProfileDropdown (props) {

	const [data, setData] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const profileDropdownContext = useContext(ProfileDropdownContext);
	const hideProfileDropdown = profileDropdownContext.hideProfile;

	const router = useRouter();

	useEffect(() => {
		async function getCurrentUser()
		{
			const session = await getSession();
			if (session) {
				const userId = session.user.userId;
				const currentUser = await getPoet(userId);
				if (currentUser.poet) {
					const slug = currentUser.poet.slug;
					setData(slug);
					setIsLoading(false);
				}
			}
		}
		getCurrentUser();
	}, []);

	if (isLoading) {
		return <Loading dropdown />;
	}

	async function logoutHandler() {

		const result = await signOut({ redirect: false, callbackUrl: "/" });
		router.push(result.url);
	}

	function handleGoToPage() {
		router.replace(`/${data}`);
	}

	return (
		<div className={classes.profileContainer}>
			<ul className={classes.profileList}>
				<li 
					className={classes.profileItem}
				>
					<CreateIcon className={classes.icon} /><Link href='/poems'>
							Poems
					</Link>
				</li>
				<li className={classes.profileItem}>
					<FavoriteIcon className={classes.icon} /> <Link href='/reading-list'>
	
							Reading List
					</Link>
				</li>
				<li 
					className={classes.profileItem}
		
				>
					<AccountCircleIcon className={classes.icon} /><Link href='/account'>
						 Account
					</Link>
				</li>
				<li 
					className={classes.profileItem}
					onClick={handleGoToPage}
			
				>
					<AccountBalanceIcon className={classes.icon} /><a>
						Go To Page
				</a></li>
				<div className={classes.horizontalRule} >
				<hr ></hr>
				</div>
				<li className={classes.profileItem}>
					<ExitToAppIcon className={classes.icon} /><div 
						className={classes.logout}
						onClick ={logoutHandler}
					>
						 Sign Out
					</div>
				</li>
			</ul>
		</div>
	)
};

export default ProfileDropdown;