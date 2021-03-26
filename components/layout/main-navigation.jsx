import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';

import Logo from './logo';
import classes from './main-navigation.module.css';

function MainNavigation(props) {
	const [session, loading] = useSession();

	function logoutHandler() {
		signOut();
	}

	const { home, auth } = props;
	
	return (
		<header className={
				auth ? classes.noHeader :
					home ? classes.mainHeader : 
							classes.plainHeader
			}
		>
			<div className={classes.head}>
				<Link href="/">
					<a>
						<Logo home={home} />
					</a>
				</Link>
				<Link href="/">
					<div className={
							home ? classes.titleContainer : classes.plainTitleContainer
						}
					>
						<a className={classes.title}>
							noontide
						</a>
						<a className={classes.secondLine}>
							poetry club
						</a>
					</div>						
				</Link>
			</div>
			<nav>
				<ul>
					{
						!session && (
							<li>
								<Link href="/auth">login</Link>
							</li>
						)
					}
          			{
          				session && (
          					<li>
            					<Link href='/profile'>profile</Link>
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



