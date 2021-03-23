import Link from 'next/link';
import Image from 'next/image';

import classes from './featured-poets-item.module.css';

function FeaturedPoetsItem(props) {
	const { userName, name, imageUrl, poems } = props;
	console.log("Name:", name, poems);

	let poemText = '';
	poems[0].text.blocks.map(line => {
		poemText = poemText.concat(line.text+'\n');
	});

	return (
	
			<Link href={`/${userName}`}>
				<a>
					<div className={classes.poet}>
						<div className={classes.image}>
							<Image 
								src={imageUrl}
								alt={name}
								width={320}
								height={550}
							/>
						</div>
						<div className={classes.name}>
							<h3>{name}</h3>
						</div>
						<div className={classes.poem}>
							<p>{poemText}</p>
						</div>
					</div>
				</a>
			</Link>
		
	)
};


export default FeaturedPoetsItem;




