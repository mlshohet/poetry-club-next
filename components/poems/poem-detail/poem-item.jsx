import Link from 'next/link';
import Image from 'next/image';

import classes from './poem-item.module.css';

function PoemItem(props) {

	const { title, text, date, slug } = props.poem;

	const poemText = text.replace(/\\n/g, \<p>/);

	// const formattedDate =  new Date(date).toLocaleDateString('en-US', {
	// 	day: 'numeric',
	// 	month: 'long',
	// 	year: 'numeric'
	// });

	const linkPath = `/poems/${slug}`;

	return (
		<li className={classes.poem}>
			<Link href={linkPath}>
				<a>
					<div>
						<h3>{title}</h3>
						<span>{poemText}</span>
					</div>
				</a>
			</Link>			
		</li>
	);

};

export default PoemItem;