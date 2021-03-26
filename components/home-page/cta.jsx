import classes from './cta.module.css';

function CTA() {
	return (
		<div className={classes.ctaContainer}>
			<h1 className={classes.cta}>
				Join <span className={classes.noontide}>noontide</span> to publish poems on site and discover other writers.
			</h1>
		</div>

	);
};

export default CTA;