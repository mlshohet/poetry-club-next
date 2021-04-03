import { useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';
import { useRouter } from 'next/router';

import Logo from './logo';
import classes from './main-navigation.module.css';

function MainNavigation(props) {
	const [session, loading] = useSession();

	const router = useRouter();

	async function logoutHandler() {
		const result = await signOut({ 
			redirect: false,
			callbackUrl: 'https://localhost:3000/'
		});
		if (result) {
			router.push(result.url);
		}
	}

	const { home, auth } = props;

	console.log("Header loads");
	
	return (
		<header className={
				auth ? classes.noHeader :
					home ? classes.mainHeader : 
							classes.plainHeader
			}
		><div className={classes.head}>
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
			<nav>
				<ul>
					{
						!session && (
							<li>
								<Link href='/auth'><a>login</a></Link>
							</li>
						)
					}
          			{
          				session && (
          					<li>
            					<Link href='/account'><a>profile</a></Link>
          					</li>
          				)
          			}
          			{ 
          				session &&  (
	          				<li>
		            			<button onClick={logoutHandler}>logout</button>
		         			</li>
          				)
          			}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;



