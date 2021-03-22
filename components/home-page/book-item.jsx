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
				<div className={classes.detailsItem}>{title}</div>
				<div className={classes.price}>${price}</div>
				<div className={classes.detailsItem}>{shopName}</div>
			</div>
		</div>
	);
};

export default BookItem;