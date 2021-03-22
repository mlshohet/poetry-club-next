import Link from 'next/link';

import Logo from './logo';
import classes from './main-navigation.module.css';

function MainNavigation() {
	return (
		<header className={classes.mainHeader}>
			<Link href="/">
				<a>
					<Logo />
				</a>
			</Link>
			<nav>
				<ul>
					<li>
						<Link
							href="/posts"
						>
							JOIN
						</Link>
					</li>
					<li>
						<Link
							href="/contact"
						>
							LOGIN
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;