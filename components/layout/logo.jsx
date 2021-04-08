import Image from 'next/image';
import classes from './logo.module.css';

function Logo(props) {
	const { home } = props;

	const logoPath = "/images/site/sun-logo.png";
	const logoBWPath = "/images/site/sun-logo-bw.svg";

	return (
		<div className="classes.logo">
			<Image 
				src={
					logoPath
				}
				alt="Noontide Poetry Club Logo"
				width={50}
				height={50}
			/>
		</div>
	);
};


export default Logo;