import { createContext, useState } from 'react';

const ProfileDropdownContext = createContext({
	profile: null,
	showProfile: function() {},
	hideProfile: function() {}
});

export function ProfileDropdownContextProvider(props) {

	const [profileHidden, setProfileHidden] = useState(true);

	function showProfileDropdown() {
		console.log("Profile context firing");
		setProfileHidden(false);
	}

	function hideProfileDropdown() {
		setProfileHidden(true);
	} 

	const context = {
		profile: profileHidden,
		showProfile: showProfileDropdown,
		hideProfile: hideProfileDropdown

	};

	return (
		<ProfileDropdownContext.Provider value={context} >
			{props.children}
		</ProfileDropdownContext.Provider>
	)
}

export default ProfileDropdownContext;


