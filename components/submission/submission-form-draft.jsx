import { Fragment, useState, useEffect, useRef } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';


import classes from './submission-form.module.css';
import Notification from '../ui/notification';

function TextEditor() {

	const focused = useRef();
	useEffect(() => focused.current.focus(), []);

	const [isBActive, setIsBActive] = useState(false);
	const [isIActive, setIsIActive] = useState(false);
	const [isUActive, setIsUActive] = useState(false);
	const [editorState, setEditorState] = useState(
		() => EditorState.createEmpty(),
	);

	function handleKeyCommand(command, editorState) {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			setEditorState(newState);
			return 'handled';
		}
		return 'not-handled';
	};

	function onStyleClickHandler(e) {
		const style = e.target.value;
		e.preventDefault();
		let newState;
		if (style === "B") {
			setIsBActive(!isBActive);
			newState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
		} else if (style == "I") {
			setIsIActive(!isIActive);
			newState = RichUtils.toggleInlineStyle(editorState, 'ITALIC');
		} else if (style == "U") {
			setIsUActive(!isUActive);
			newState = RichUtils.toggleInlineStyle(editorState, 'UNDERLINE');
		} else {
			newState = editorState;
		}
		
		setEditorState(newState);
	};

	return (
		<Fragment>
			<div className={classes.editorContainer}>
				<div className={classes.buttonsContainer}>
					<button 
						style={{"fontWeight": "bold"}}
						className = {
							isBActive ?
							classes.active :
							classes.buttonStyle
						}
						value="B"
						onMouseDown={onStyleClickHandler} 
					>
	
							B
					</button>
					<button
						style={{"fontStyle": "italic"}}
						className = {
							isIActive?
							classes.active :
							classes.buttonStyle
						}
						value="I" 
						onMouseDown={onStyleClickHandler}
					>
	
							I

					</button>
					<button 
						style={{"textDecoration": "underline"}}
						className = {
							isUActive?
							classes.active :
							classes.buttonStyle
						}
						value="U"
						onMouseDown={onStyleClickHandler}
					>
			
							U
					</button>
				</div>
				<div className={classes.editorMain}>
					
					<Editor 
						editorState={editorState} 
						onChange={setEditorState}
						ref={focused}
						handleKeyCommand={handleKeyCommand}
					/>
				</div>
				<div className={classes.actions}>
					<button className={classes.buttonStylePublish}>Publish</button>
				</div>
			</div>
		</Fragment>
		);
};

const MyInput = () => {
  const [value, setValue] = useState('');
  const onChange = (event) => setValue(event.target.value);


  return <input value={value} onChange={onChange} />;
};

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
}

export default TextEditor;


