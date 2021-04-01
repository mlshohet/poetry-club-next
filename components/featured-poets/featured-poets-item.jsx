import { Fragment, useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import classes from './featured-poets-item.module.css';

function FeaturedPoetsItem(props) {
	const { imageUrl, name, uname } = props;

	const [isVisible, setIsVisible] = useState(false);

	const router = useRouter();

	// const handleClick = () => {
	
	// 	router.push(`/${userName}`);
	// }

	return (
		<Link href={`${uname}`} >
			<a>
				<div className={classes.image}>
					<Image
						src={imageUrl}
						alt={name}
						width={320}
						height={350}
					/>
				</div>
			</a>
		</Link>
	)
};


export default FeaturedPoetsItem;




