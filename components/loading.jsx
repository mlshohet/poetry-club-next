import classes from './loading.module.css';

function Loading({ dropdown }) {

	return (
		<div className={
			dropdown ? classes.dropdown : classes.loaderContainer
		}>
			<div className={classes.loader}></div>
		</div>
	);
};

export default Loading;