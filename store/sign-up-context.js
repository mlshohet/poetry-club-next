import { createContext, useState } from 'react';

const SignUpModeContext = createContext({
	isSignUpMode: null,
	setIsSignUpMode: function (signUpMode) {},
});

export function SignUpModeContextProvider(props) {
	const [isSignUpMode, setSignUpMode] = useState(false);
	
	function setIsSignUpMode(isSignUpMode) {
		setSignUpMode(isSignUpMode);
	};

	const context = {
		isSignUpMode: isSignUpMode,
		setIsSignUpMode: setIsSignUpMode
	}

	return (
		<SignUpModeContext.Provider value={context}>
			{props.children}
		</SignUpModeContext.Provider>
	);
};

export default SignUpModeContext;


