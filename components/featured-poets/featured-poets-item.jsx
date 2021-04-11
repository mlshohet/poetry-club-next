import { Fragment, useState, useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Loading from '../loading';

import classes from './featured-poets-item.module.css';

function FeaturedPoetsItem(props) {
	const { name, slug } = props;
	let { imageUrl } = props;

	const [screen, setScreen] = useState(false);

	if (!imageUrl) {
		imageUrl = 'https://firebasestorage.googleapis.com/v0/b/noontide-poetry.appspot.com/o/images%2F606e8d3731b25212fed45762sun-logo-bw.png?alt=media&token=73ad77af-c85a-43b6-b2fe-5e35b1f96103';
	}

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




