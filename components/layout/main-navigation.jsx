import Link from 'next/link';

import Logo from './logo';
import classes from './main-navigation.module.css';

function MainNavigation(props) {
	const { home } = props;
	return (
		<header className={
				home ? classes.mainHeader : classes.plainHeader
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
					<li>
						<Link
							href="/login"
						>
							login
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;