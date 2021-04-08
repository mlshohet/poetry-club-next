import { Fragment, useState, useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Loading from '../loading';

import classes from './featured-poets-item.module.css';

function FeaturedPoetsItem(props) {
	const { imageUrl, name, uname } = props;

	const [screen, setScreen] = useState(false);

	const href = `/${uname}`;

	const router = useRouter();

	function handleClick() {
		event.preventDefault();
		setScreen(true);

		router.push(href);
	}

	return (

		
	
		<div className={classes.image}>
		<Link href={href}>
					<Image
						src={imageUrl}
						alt={name}
						width={320}
						height={350}
					/>
			</Link>
		</div>
	)
};


export default FeaturedPoetsItem;




