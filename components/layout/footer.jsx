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
						<FacebookIcon />
					</li>
					<li className={classes.icon}>
						<InstagramIcon />
					</li>
					<li className={classes.icon}>
						<TwitterIcon />
					</li>
				</ul>
				<p>
					© 2021 Noontide Poetry Club. 
				</p>
			</div>
		</footer>
	);
};

export default Footer;