import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import classes from './cta-add.module.css';


function CtaAdd() {

	return (
			<div className={classes.ctaContainer}>
				<h1 className={classes.cta}>
					Add <span className={classes.noontide}>noontide</span> to your homepage
					<ArrowDownwardIcon className={classes.arrow}/>
				</h1>
			</div>
	);
};

export default CtaAdd;