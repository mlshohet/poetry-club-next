import Link from 'next/link';

import Logo from './logo';
import classes from './main-navigation.module.css';

function MainNavigation() {
	return (
		<header className={classes.mainHeader}>
			<div className={classes.head}>
				<Link href="/">
					<a>
						<Logo />
					</a>
				</Link>
				<Link href="/">
					<div className={classes.titleContainer}>
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
							Login
						</Link>
					</li>
					<li>
						<Link
							href="/contact"
						>
							Contact
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;