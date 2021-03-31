import { useRef } from 'react';
import { signOut } from 'next-auth/client';

import classes from './account.module.css';

function Account (props) {

	const { user, session } = props;
	console.log("User:", user);

	if (!user.name) {
		user.name="Anonymous";
	}

	const newNameRef = useRef();
	const newEmailRef = useRef();
	const oldPasswordRef = useRef();
	const newPasswordRef = useRef();

	function onEdit(ref) {
		event.preventDefault();
		ref.current.focus();
	}

	async function changeNameHandler() {

		const userId = user._id;
		const enteredNewName = newNameRef.current.value;
	
		let data;
		try {
			const response = await fetch('/api/user/change-name', {
				method: 'PATCH',
				body: JSON.stringify(
					{
						userId: userId,
						name: enteredNewName
					}
				),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			//

			data = await response.json();
			console.log(data);

			if(!response.ok) {
				throw new Error({ message: "Name update failed!", data });
			}

		} catch (error) {
			console.log(error, "Could not update name!");
		}
		console.log(data);
	};

	async function changeEmailHandler() {

		const userId = user._id;
		const enteredNewEmail = newEmailRef.current.value.toLowerCase();
	
		let data;
		try {
			const response = await fetch('/api/user/change-email', {
				method: 'PATCH',
				body: JSON.stringify(
					{
						userId: userId,
						email: enteredNewEmail
					}
				),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			//

			data = await response.json();
			console.log(data);

			if(!response.ok) {
				throw new Error({ message: "Email update failed!", data });
			}

		} catch (error) {
			console.log(error, "Could not update email!");
		}
		console.log(data);
	};

	async function changePasswordHandler() {
		const enteredOldPassword = oldPasswordRef.current.value;
    	const enteredNewPassword = newPasswordRef.current.value;

    	const passwordData = {
      		oldPassword: enteredOldPassword,
      		newPassword: enteredNewPassword
    	}
    	
		try {
			const response = await fetch('/api/user/change-password', {
				method: 'PATCH',
				body: JSON.stringify(passwordData),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.log(error, "Could not change password!");
		}
	}

	async function deleteAccountHandler() {

		const userId = user._id;
	
		let data;
		try {
			const response = await fetch('/api/user/delete-account', {
				method: 'DELETE',
				body: JSON.stringify({ userId: userId }),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			data = await response.json();

			if(!response.ok) {
				throw new Error({ message: "Deleting failed!", data });
			}

		} catch (error) {
			console.log(error, "Could not delete account!");
		}
		console.log(data);
		signOut({ callbackUrl: 'https://localhost:3000/' });
	};

	return (
		<div className={classes.accountContainer}>
			<div className={classes.accountItemContainer}>
        		<input 
        			type='name'
        			id='name'
        			placeholder={user.name}
        			ref={newNameRef}
        		/>
				<div className={classes.buttonContainer}>
					<button onClick={() => onEdit(newNameRef)}>Edit</button>
					<button onClick={changeNameHandler}>Save</button>
				</div>
			</div>
			<div className={classes.accountItemContainer}>
				<p>Image</p>
				<div className={classes.buttonContainer}>
					<button>Edit</button>
					<button>Save</button>
				</div>
			</div>
			<div className={classes.accountItemContainer}>
				<input 
        			type='email'
        			id='email'
        			placeholder={session.user.email}
        			ref={newEmailRef}
        		/>
				<div className={classes.buttonContainer}>
					<button onClick={() => onEdit(newEmailRef)}>Edit</button>
					<button onClick ={changeEmailHandler}>Save</button>
				</div>
			</div>
			<div className={classes.accountItemContainer}>
				<input 
        			type='password'
        			id='old-password'
        			placeholder="password"
        			ref={oldPasswordRef}
        		/>
        		<input 
        			type='password'
        			id='new-password'
        			placeholder="new password"
        			ref={newPasswordRef}
        		/>
				<div className={classes.buttonContainer}>
					<button onClick={() => onEdit(oldPasswordRef)}>Edit</button>
					<button onClick={changePasswordHandler}>Save</button>
				</div>
			</div>
			<div className={`${classes.accountItemContainer} ${classes.danger}`}>
				<p>Delete Profile</p>
				<div className={classes.buttonContainer}>
				<button className="delete" onClick={deleteAccountHandler}>Delete</button>
				</div>
			</div>
		</div>
	);
};

	export default Account;