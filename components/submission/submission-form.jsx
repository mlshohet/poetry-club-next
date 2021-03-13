import { useState, useEffect, useRef } from 'react';

import classes from './submission-form.module.css';
import Notification from '../ui/notification';

async function getData(id, slug) {
	const response = await fetch(`/api/${id}/${slug}`);
	const data = await response.json();
	if (!response.ok) {
		throw new Error("Something went wrong");
	}
	
	return data;
};

async function sendSubmissionData(poetId, submissionData) {
	console.log("Poet id from submission:", poetId);
	const response = await fetch(`http://localhost:3000/api/${poetId}`, {
			method: 'POST',
			body: JSON.stringify(submissionData),
			headers: {
				'Content-Type': 'application/json'
			}
		});

	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.message || "Something went wrong");
	}
};

function SubmissionForm() {

	const [enteredTitle, setEnteredTitle] = useState('');
	const [enteredPoem, setEnteredPoem] = useState('');

	const [requestStatus, setRequestStatus] = useState(); //pending, success, error
	const [requestError, setRequestError] = useState();

	useEffect(() => {
		if (requestStatus === 'success' || requestStatus === 'error') {
			const timer = setTimeout(() => {
				setRequestStatus(null);
				setRequestError(null);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [requestStatus]);

	async function submissionHandler(event) {
		event.preventDefault();

		setRequestStatus('pending');
		try	{
			const response =  await sendSubmissionData(
				'wbyeats',
					{
						title: enteredTitle,
						text: enteredPoem,
						date: new Date().toLocaleDateString('en-US', {
										day: 'numeric',
										month: 'long',
										year: 'numeric'
								})
					}
			);
			console.log("Respoonse:", response);
			setRequestStatus('success');
			setEnteredTitle('');
			setEnteredPoem('');
		} catch (error) {
			setRequestError(error.message);
			setRequestStatus('error');
			throw new Error(error);
		}
	};

	async function getPoemHandler(event) {
		event.preventDefault();
		setRequestStatus('pending');
		try	{
			const response =  await getData('604969c3c414695f8ddc4759', enteredTitle);
			const returnedPoem = response.poem;
			console.log("Returned poem: ",returnedPoem);
			setEnteredPoem(returnedPoem.text);
			setRequestStatus('success');
			setEnteredTitle('');
		} catch (error) {
			setRequestError(error.message);
			setRequestStatus('error');
		}
	}

	let notification;

	if (requestStatus === 'pending') {
		notification = {
			status: 'pending',
			title: 'Submitting...',
			message: 'Your submission is on its way'
		};
	}

	if (requestStatus === 'success') {
		notification = {
			status: 'success',
			title: 'Success!',
			message: 'Published successfully!'
		};
	}

	if (requestStatus === 'error') {
		notification = {
			status: 'error',
			title: 'Error!',
			message: requestError
		};
	}

	return (
		<section className={classes.contact}>
			<h1>
				Submit a poem
			</h1>
			<form 
				className={classes.form}
				onSubmit={submissionHandler}
			>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor="title">
							Title
						</label>
						<input 
							type="text"
							id="title"
							value={enteredTitle}
							onChange={event => setEnteredTitle(event.target.value)}
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor="poem">
							Poem
						</label>
						<textarea 
							id="message"
							rows='10'
							value={enteredPoem}
							required
							onChange={event => setEnteredPoem(event.target.value)}
						></textarea>
					</div>
					<div className={classes.actions}>
						<button>Publish</button>
					</div>
				</div>
			</form>
			<form 
				className={classes.form}
				onSubmit={getPoemHandler}
			>
				<h1>Input title of poem to edit</h1>
				<div className={classes.controls}>
					<div className={classes.control}>
					   <label htmlFor="title">
							Title
						</label>
						<input 
							type="text"
							id="title"
							value={enteredTitle}
							onChange={event => setEnteredTitle(event.target.value)}
						/>
					</div>
				</div>
				<div>
					<button>Edit</button>
				</div>
			</form>
			{
				notification &&
				(
					<Notification
						status={notification.status}
						title={notification.title}
						message={notification.message}
					/>
				)
			}
		</section>
	);
};

export default SubmissionForm;