import Image from 'next/image';
import classes from './logo.module.css';

function Logo() {

	return (
		<div className="classes.logo">
			<Image 
				src="/images/site/sun-logo.png"
				alt="Noontide Poetry Club Logo"
				width={100}
				height={100}
			/>
		</div>
	);
};

export default Logo;