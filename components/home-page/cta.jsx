import classes from './cta.module.css';

function CTA() {
	return (
		<div className={classes.ctaContainer}>
			<h1 className={classes.cta}>
				Join to publish poems on site, discover other writers, receive newsletters and notifications about workshops, signings and more...
			</h1>
		</div>

	);
};

export default CTA;