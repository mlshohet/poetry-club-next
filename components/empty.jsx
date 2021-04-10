import Image from 'next/image';

import classes from './empty.module.css';

function Empty() {

	return (
		<div className={classes.emptyContainer}>
			<Image 
				src="/images/site/empty-typewriter.png"
				alt="empty"
				width={200}
				height={200}
			/>
		</div>

	)

};

export default Empty;