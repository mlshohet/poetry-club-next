import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import classes from './cta-add.module.css';


function CtaAdd() {

	return (
			<div className={classes.ctaContainer}>
				<h1 className={classes.cta}>
					Install <span className={classes.noontide}>noontide</span> on your device
					<ArrowUpwardIcon className={classes.arrow}/>
				</h1>
			</div>
	);
};

export default CtaAdd;