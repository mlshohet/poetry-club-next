import { useState, useRef } from 'react';

import { useRouter } from 'next/router';

import classes from '../auth/auth-form.module.css';

function ForgotPasswordForm() {

	const emailInputRef = useRef();
	const router = useRouter();

	async function onSubmitHandler(event) {
		event.preventDefault();
		const emailQuery = emailInputRef.current.value;

		let data;
		try {
			const response = await fetch(`/api/user/forgot-password`, {
				method: 'PATCH',
				body: JSON.stringify({
					email: emailQuery,
				}),
				headers: {
					'Content-Type': 'application/json'
				},
			});

			data = await response.json();
			if(!response.ok) {
				throw new Error('No response.');
			}

		} catch (error) {
			alert(error.message);
			return;
		}

		alert("Passcode sent to email.");
		router.replace('/auth');
	}

	return (
		<div className={classes.authContainer}>
			<form 
				className={classes.auth}
				onSubmit={onSubmitHandler}
			>
				<h3>Enter your email</h3>
				<div className={classes.control}>
	            <input 
	              type='email'
	              name='emailForgot'
	              id='email' 
	              placeholder='Email'
	              required 
	              ref={emailInputRef}
	            />
	          </div>
	          <div className={classes.actions}>
	          	<button>Submit</button>
	          </div>
			</form>
		</div>
	);
}

export default ForgotPasswordForm;