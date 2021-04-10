import { Fragment, useState, useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Loading from '../loading';

import classes from './featured-poets-item.module.css';

function FeaturedPoetsItem(props) {
	const { imageUrl, name, slug } = props;

	const [screen, setScreen] = useState(false);

	return (
		<div className={classes.image}>
			<Link href={`/${slug}`}>
				<a>
					<Image
						src={imageUrl}
						alt={name}
						width={320}
						height={320}
						layout="responsive"
					/>
				</a>
			</Link>
		</div>
	)
};


export default FeaturedPoetsItem;




