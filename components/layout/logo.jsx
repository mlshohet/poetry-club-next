import Image from 'next/image';
import classes from './logo.module.css';

function Logo(props) {
	const { home } = props;

	const logoPath = "/images/site/sun-logo.png";
	const logoBWPath = "/images/site/sun-logo-bw.png";

	return (
		<div className="classes.logo">
			<Image 
				src={
					home ? logoPath : logoBWPath 
				}
				alt="Noontide Poetry Club Logo"
				width={120}
				height={120}
			/>
		</div>
	);
};


export default Logo;