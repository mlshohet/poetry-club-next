import { Fragment, useState, useEffect, useRef } from 'react';

import { useSession } from 'next-auth/client';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import classes from './submission-form.module.css';
import Notification from '../ui/notification';

function TextEditor() {
	const focused = useRef();
	useEffect(() => focused.current.focus(), [focused]);

	const [ session, loading ] = useSession();
	const email = session.user.email;

	// Username from email
	const userName = email.slice(0, email.indexOf("@"));


	const emptyContentState = convertFromRaw({
	  entityMap: {},
	  blocks: [
	    {
	      text: '',
	      key: 'foo',
	      type: 'unstyled',
	      entityRanges: [],
	    },
	  ],
	});

	const [isIActive, setIsIActive] = useState(false);
	const [editorState, setEditorState] = useState(
		() => EditorState.createWithContent(emptyContentState),
	);



	async function textSubmitHandler() {

		event.preventDefault();
		
		const submission = editorState.getCurrentContent();
		const rawJS = convertToRaw(submission);
		console.log("Raw: ", rawJS);
		const poemId = rawJS.blocks[0].key + Math.random() * 1000;

		const date = new Date().toLocaleDateString('en-US', {
					day: 'numeric',
					month: 'long',
					year: 'numeric' 
		});

		const poetId = userName;
		let response;
		try {
			response = await fetch(`http://localhost:3000/api/user/post-poem`, {
				method: 'POST',
				body: JSON.stringify({
					text: rawJS,
					poemId: poemId,
					date: date,
				}),
				headers: {
					'Content-Type': 'application/json'
				},
			});
		} catch (error) {
			console.log(error, "Could not connect!");

			return;
		}

		let data;
		
		try {
			data = await response.json();

		} catch (error) {
			console.log(error, "No response!");
			return;
		}

		if (!response.ok) {
			throw new Error("There was no response!");
			return;
		}

		setEditorState(() => EditorState.createEmpty());
		return;
	};

	function editReceivedText(receivedContent) {
		setEditorState(() => EditorState.createEmpty());

		const newContentState = convertFromRaw(receivedContent);
		setEditorState(() => EditorState.createWithContent(newContentState));
	};

	return (
		<Fragment>
			<div className={classes.editorContainer}>
				<div className={classes.buttonsContainer}>
				</div>
				<div className={classes.editorMain}>
					
					<Editor 
						editorState={editorState} 
						onChange={setEditorState}
						ref={focused}
						editReceivedText={editReceivedText}
					/>
				</div>
				<div className={classes.actions}>
					<button 
						className={classes.buttonStylePublish}
						onClick={textSubmitHandler}
					>
						Send
					</button>
					
				</div>
				<div id="output" className={classes.output}
				>
			
				</div>
			</div>
			
		</Fragment>
		);
};

export default TextEditor;


