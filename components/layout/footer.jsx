import Link from 'next/link';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';

import classes from './footer.module.css';

function Footer(props) {

	const { home, auth } = props;

	return (
		<footer className={
				auth ? classes.noFooter :
					home ? classes.footer : 
						classes.plainFooter
			}
		>
			<div className={classes.footerText}>
				<ul className={classes.socialLinks}>
					<li className={classes.icon}>
						<a href="https://www.facebook.com/NoontidePoetry">
							<FacebookIcon />
						</a>
					</li>
					<li className={classes.icon}>
						<a href="https://www.instagram.com/noontidepoetryclub/">
							<InstagramIcon />
						</a>
					</li>
					<li className={classes.icon}>
						<a href="https://twitter.com/NoontideC">
							<TwitterIcon />
						</a>
					</li>
				</ul>
				<Link href='/about-terms-contact'>
					<span className={classes.about}>
						About / Terms of Use / Contact
					</span>
				</Link>
				<p className={classes.copyright}>
					© 2021 Noontide Poetry Club. 
				</p>
			</div>
		</footer>
	);
};

export default Footer;