import { Fragment, useState, useEffect } from 'react';

import ProfileForm from './profile-form';
import TextEditor from '../text-editor/text-editor';

import classes from './user-profile.module.css';

function UserProfile() {

  return (
  	<Fragment>
    	<section className={classes.profile}>
	      <h1>Your User Profile</h1>
	      <ProfileForm />
	      <div className={classes.editor}>
	       		<TextEditor />
	      </div>
	    </section>
	  </Fragment>

  );
}

export default UserProfile;