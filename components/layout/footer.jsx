import Image from 'next/image';
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
						<Image 
							src="/images/site/social/facebook.png"
							alt="facebook icon"
							width={32}
							height={32}
						/>
					</li>
					<li className={classes.icon}>
						<Image 
							src="/images/site/social/instagram.png"
							alt="facebook icon"
							width={32}
							height={32}
						/>
					
					</li>
					<li className={classes.icon}>
						<Image 
								src="/images/site/social/twitter.png"
								alt="facebook icon"
								width={32}
								height={32}
							/>
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