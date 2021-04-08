import { useState, useEffect, useContext } from 'react';

import { useSession, signOut } from 'next-auth/client';

import ProfileDropdownContext from '../../store/profile-dropdown-context';

import Link from 'next/link';

import { useRouter } from 'next/router';

import { getPoet } from '../../lib/poets-utils';

import classes from './profile-dropdown.module.css';

function ProfileDropdown (props) {

	const [data, setData] = useState();
	const [session, loading] = useSession();

	const profileDropdownContext = useContext(ProfileDropdownContext);
	const hideProfileDropdown = profileDropdownContext.hideProfile;

	const router = useRouter();

	const email = session.user.email;

	useEffect(() => {
		console.log("useEffect firing");
		async function getCurrentUser()
		{
			const currentUser = await getPoet(email);
				if (currentUser) {
					const slug = currentUser.poet.slug;
					setData(slug);
				}
		}
		getCurrentUser();
	}, [email]);

	if (!data) {
		return null;
	}

	console.log("Data: ", data);

	async function logoutHandler() {

		const result = await signOut({ redirect: false, callbackUrl: "localhost:3000/" });
		router.push(result.url);
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
				<li 
					className={classes.profileItem}
					onClick={hideProfileDropdown}
				>
					<Link href={`/${data}`}>
						Go to page
					</Link>
				</li>
				<div className={classes.horizontalRule} >
				<hr ></hr>
				</div>
				<li className={classes.profileItem} onClick={hideProfileDropdown}>
					<div 
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