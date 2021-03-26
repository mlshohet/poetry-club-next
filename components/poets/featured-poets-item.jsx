import { Fragment, useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import classes from './featured-poets-item.module.css';

function FeaturedPoetsItem(props) {
	const { userName, imageUrl, name } = props;

	const [isVisible, setIsVisible] = useState(false);

	const router = useRouter();

	const handleClick = () => {
		setIsVisible(true);
		setTimeout(() => setIsVisible(false), 2000);
		//router.push(`/${userName}`);
	}

	return (
		<Fragment>
		<div onClick={handleClick} >
		
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

			
		</div>
		<div className={
					isVisible ? classes.screen : classes.noScreen
					} 
				>Loading
		</div>
		</Fragment>
		
	)
};


export default FeaturedPoetsItem;




