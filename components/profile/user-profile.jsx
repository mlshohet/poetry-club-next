import { Fragment, useState, useEffect } from 'react';

import ProfileForm from './profile-form';
import TextEditor from '../text-editor/text-editor';

import classes from './user-profile.module.css';

function UserProfile() {

	async function changePasswordHandler(passwordData) {
		console.log("Passwod data: ", passwordData);
		const response = await fetch('/api/user/change-password', {
			method: 'PATCH',
			body: JSON.stringify(passwordData),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await response.json();
		console.log(data);
	}

  return (
  	<Fragment>
    	<section className={classes.profile}>
	      <ProfileForm onChangePassword={changePasswordHandler} />
	      <div className={classes.editor}>
	       		<TextEditor />
	      </div>
	    </section>
	  </Fragment>

  );
}

export default UserProfile;