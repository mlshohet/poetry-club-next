import { useContext } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import SignUpModeContext from '../../store/sign-up-context';

import classes from './cta.module.css';


function CTA() {
	const router = useRouter();
	
	const signUpContext = useContext(SignUpModeContext);
	let isSignUpMode = signUpContext.isSignUpMode;
	const setIsSignUpMode = signUpContext.setIsSignUpMode;

	function handleOnClick() {
		setIsSignUpMode(true);
		router.push('/auth');
	}

	return (
			<div className={classes.ctaContainer}>
				<h1 className={classes.cta} onClick={handleOnClick}>
					Join <span className={classes.noontide}>noontide</span> to publish poems on site and discover other writers.
				</h1>
			</div>
	);
};

export default CTA;