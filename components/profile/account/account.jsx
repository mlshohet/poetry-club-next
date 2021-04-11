import { useState, useRef, useEffect } from 'react';
import { signIn, signOut } from 'next-auth/client';

import { useRouter } from 'next/router';

import Image from 'next/image';

import { storage } from '../../../firebase/firebase.utils';

import classes from './account.module.css';

function Account (props) {

	const { user, session } = props;

	if (!user.name) {
		user.name="Unknown";
	}

	const router = useRouter();

	const [invisible, setInvisible] = useState(false);

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

		if (!enteredNewName || enteredNewName === '' || enteredNewName.length > 40) {
			alert("Please enter a valid new name");
			return;
		}
	
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

			data = await response.json();
			console.log(data);

			if(!response.ok) {
				throw new Error({ message: "Name update failed!", data });
			}

		} catch (error) {
			alert("Could not update name!")
			return;
		}
		alert("Name changed successfully.");
		return;
	};

	async function changeEmailHandler() {

		const userId = user._id;
		const enteredNewEmail = newEmailRef.current.value.toLowerCase();

		const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
		if (
			!enteredNewEmail || enteredNewEmail === '' ||
			!regex.test(enteredNewEmail) || enteredNewEmail.length > 50
		) {
			alert("Please enter a valid email.");
			newEmailRef.current.value = null;
			return;
		}

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

			data = await response.json();
			console.log(data);

			if(!response.ok) {
				throw new Error({ message: "Email update failed!", data });
			}

		} catch (error) {
			alert("Could not update email. Please make sure your email is valid.");
			return;
		}
		alert("Email updated.");
	};

	async function changePasswordHandler() {
		const enteredOldPassword = oldPasswordRef.current.value;
    	const enteredNewPassword = newPasswordRef.current.value;

    	if (
    		!enteredOldPassword || !enteredNewPassword ||
    		enteredOldPassword === enteredNewPassword ||
    		enteredNewPassword.length < 6 || enteredNewPassword.length > 16
    	) {
    		alert("Please enter a valid new password, no less than 6 and no more than 16 characters long.");
    		return;
    	}

    	const passwordData = {
      		oldPassword: enteredOldPassword,
      		newPassword: enteredNewPassword
    	}
    	
    	let data;
		try {
			const response = await fetch('/api/user/change-password', {
				method: 'PATCH',
				body: JSON.stringify(passwordData),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			data = await response.json();

			if (!response.ok) {
				throw new Error("Could not change password");
			}
	
		} catch (error) {
			console.log(data);
			alert("Could not change password. Please make sure your password is valid, and no less than 6 characters and no more than 16 characters long.")
			return;
		}
		alert("Password changed.");
		return;
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
			alert("Could not delete profile.");
			return;
		}
		signOut({ callbackUrl: 'https://localhost:3000/' });
	};

	const [selectedFile, setSelectedFile] = useState();
	const imageRef = useRef();

	function fileSelectedHandler (event) {
		event.preventDefault();

		setSelectedFile(event.target.files[0]);
		
		imageRef.current.value = null;
		
		setInvisible(true);
	}

	async function imageUploadHandler() {
		
		if (!selectedFile) {
			alert("Please select a valid image file.");
			return;
		}

		if (selectedFile.size > 1600000) {
			alert("Image file size is too big.");
			return;
		}

		const imageName = user._id+selectedFile.name;

		// Firebase Storage code, not React ref related
		const storageRef = storage.ref();
		const file = selectedFile;
		const thisRef = storageRef.child(imageName);

		const profileImgImagesRef = storageRef.child(`images/${imageName}`);

		let snapshot;
		let imageUrl;
		try {
			snapshot = await profileImgImagesRef.put(file);
			imageUrl = await snapshot.ref.getDownloadURL();
		} catch (error) {
			alert("Could not upload file.");
			return;
		}

		return imageUrl;
	}

	async function imageHandler() {
		let imageUrl;

		try {
			imageUrl = await imageUploadHandler();
		} catch (error) {
			alert("Could not upload image.");
			return;
		}

		let data;
		try {
			const response = await fetch('/api/user/image-upload', {
				method: 'PATCH',
				body: JSON.stringify ({
					userId: user._id,
					imageUrl
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});

			data = await response.json();
			if (!response.ok) {
				throw new Error("Could not upload image!");
			}
		} catch (error) {
			alert("Could not change image.");
			return;
		}

		setInvisible(false);
		setSelectedFile(null);
		router.replace('/account');
		return;
	}

	return (
		<div className={classes.accountContainer}>
		<div className={classes.accountItemContainer}>
				
					{ 
						invisible ? 
						<div className={classes.fileName}>{selectedFile.name}</div> : 
						user.imageUrl && 
						(
							<div className={classes.image}>
								<Image
									src={user.imageUrl}
									alt={user.name}
									width={320}
									height={320}
								/>	
							</div>
						)
					}
			
					<input
						className={classes.invisible}
						type="file"
						accept="image/*"
						id="file" 
						name="image"
						ref={imageRef}
						onChange={fileSelectedHandler} 
					/>
				<div className={classes.buttonContainer}>
					<button onClick={() => imageRef.current.click()}>Edit</button>
					<button onClick={imageHandler}>Save</button>
				</div>
			</div>
			<div className={classes.accountItemContainer}>
        		<input 
        			type='text'
        			id='name'
        			label='Name'
        			name='User Name'
        			placeholder={user.name}
        			maxLength={30}
        			ref={newNameRef}
        		/>
				<div className={classes.buttonContainer}>
					<button onClick={() => onEdit(newNameRef)}>Edit</button>
					<button onClick={changeNameHandler}>Save</button>
				</div>
			</div>
			
			<div className={classes.accountItemContainer}>
				<input 
        			type='email'
        			id='email'
        			name='User Email'
        			maxLength={16}
        			placeholder={user.email}
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
        			label='Old Password'
        			name='Old Password'
        			placeholder="old password"
        			maxLength={16}
        			ref={oldPasswordRef}
        		/>
        		<input 
        			type='password'
        			id='new-password'
        			label='New Password'
        			name='New Password'
        			placeholder="new password"
        			maxLength={16}
        			ref={newPasswordRef}
        		/>
				<div className={classes.buttonContainer}>
					<button onClick={() => onEdit(oldPasswordRef)}>Edit</button>
					<button onClick={changePasswordHandler}>Save</button>
				</div>
			</div>
			<div className={`${classes.accountItemContainer} ${classes.danger}`}>
				<p onClick={deleteAccountHandler}>Delete Profile</p>
			</div>
		</div>
	);
};

	export default Account;