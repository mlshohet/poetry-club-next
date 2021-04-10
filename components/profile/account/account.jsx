import { useState, useRef, useEffect } from 'react';
import { signIn, signOut } from 'next-auth/client';

import { useRouter } from 'next/router';

import Image from 'next/image';

import { storage } from '../../../firebase/firebase.utils';

import classes from './account.module.css';

function Account (props) {

	const { user, session } = props;
	
	if (!user) {
		return<h1>Loading...</h1>
	}

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
			console.log(error, "Could not update name!");
		}
		console.log(data);
	};

	async function changeEmailHandler() {

		const userId = user._id;
		const enteredNewEmail = newEmailRef.current.value.toLowerCase();

		const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
		if (
			!enteredNewEmail || enteredNewEmail === '' ||
			!regex.test(enteredNewEmail) || email.length > 50
		) {
			alert("Please enter a valid email");
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
			console.log(error, "Could not update email!");
		}

		console.log(data);
	};

	async function changePasswordHandler() {
		const enteredOldPassword = oldPasswordRef.current.value;
    	const enteredNewPassword = newPasswordRef.current.value;

    	if (
    		!enteredOldPassword || !enteredNewPassword ||
    		enteredOldPassword === enteredNewPassword ||
    		enteredNewPassword < 6 || enteredNewPassword > 16
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
			console.log(error, data);
			return;
		}
			console.log(data);
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
			console.log(error, data);
		}
		console.log(data);
		signOut({ callbackUrl: 'https://localhost:3000/' });
	};

	const [selectedFile, setSelectedFile] = useState();
	const [url, setUrl] = useState();
	const imageRef = useRef();

	function fileSelectedHandler (event) {
		event.preventDefault();
		setSelectedFile(event.target.files[0]);
		setInvisible(true);
	}

	async function imageUploadHandler() {
		
		const imageName = user._id+selectedFile.name;

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
			console.log(error, "Could not upload file!");
		}

		console.log("Image uploaded!");
		console.log("Image url: ", typeof(imageUrl));

		setUrl(imageUrl);
		return imageUrl;
	}

	async function imageHandler() {
		let imageUrl;

		try {
			imageUrl = await imageUploadHandler();
		} catch (error) {
			console.log("Could not get image url!");
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
			console.log(error, data);
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
				<div className={classes.image}>
					{ 
						invisible ? '' : user.imageUrl && <Image
							src={user.imageUrl}
							alt={user.name}
							width={320}
							height={320}
					/>
				}
				</div>
				<input 
					className={classes.fileInput}
					type="file"
					id="image" 
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
				<input 
        			type='email'
        			id='email'
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
        			placeholder="old password"
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
				<p onClick={deleteAccountHandler}>Delete Profile</p>
			</div>
		</div>
	);
};

	export default Account;