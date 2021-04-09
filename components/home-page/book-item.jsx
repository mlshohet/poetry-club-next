import Image from 'next/image';

import classes from './book-item.module.css';

function BookItem(props) {
	const { imageUrl, title, price, shopName } = props;
	return (
		<div className={classes.bookItemContainer}>
		  <div className={classes.image}>	
			 <Image   
					src={imageUrl}
					alt={title}
					width={130}
					height={200}
				/>
			</div>
			<div className={classes.details}>
				<p>{title}</p>
				<p style={{ fontWeight: 'bold'}}>${price}</p>
				<p>{shopName}</p>
			</div>
		</div>
	);
};

export default BookItem;