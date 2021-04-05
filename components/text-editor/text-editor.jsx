import { Fragment, useState, useEffect, useRef, useContext } from 'react';

import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import TextEditorContext from '../../store/text-editor-context';

import classes from './text-editor.module.css';

function TextEditor(props) {

	const router = useRouter();

	const focused = useRef();
	useEffect(() => focused.current.focus(), [focused]);

	const [ session, loading ] = useSession();
	const email = session.user.email;

	// Username from email
	const userName = email.slice(0, email.indexOf("@"));

	const {editorState, setEditorState, isEditMode, setIsEditMode} = props;
	

	const textEditorContext = useContext(TextEditorContext);
	const poemId = textEditorContext.poemId;

	async function textEditSubmitHandler() {

		event.preventDefault();

		const submission = editorState.getCurrentContent();
		const rawContent = convertToRaw(submission);

		let response;
		let data;
		try {
				response = await fetch(`http://localhost:3000/api/user/edit-poem/${poemId}`, {
				method: 'PATCH',
				body: JSON.stringify({
					text: rawContent,
				}),
				headers: {
					'Content-Type': 'application/json'
				},
			});

			data = await response.json();

			if (!response.ok) {
				throw new Error("No response on edit!");
			}
		} catch (error) {
			console.log(error, data);
			return;
		}

		setIsEditMode(false);
		setEditorState(() => EditorState.createEmpty());
		router.replace('/poems');
		return;
	}

	async function textNewSubmitHandler() {

		event.preventDefault();
		
		const submission = editorState.getCurrentContent();
		const rawJS = convertToRaw(submission);
		const poemId = rawJS.blocks[0].key + Math.random() * 1000;

		const date = new Date().toLocaleDateString('en-US', {
					day: 'numeric',
					month: 'long',
					year: 'numeric' 
		});

		let response;
		let data;
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

			data = response.json();

			if (!response.ok) {
				throw new Error("Could not submit!")
			}

		} catch (error) {
			console.log(error, data);
			return;
		}

		console.log("Successfully submitted!", data);
		setEditorState(() => EditorState.createEmpty());
		router.replace('/poems');
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
					/>
				</div>
				<div className={classes.actions}>
					<button 
						className={classes.buttonStylePublish}
						onClick={
							isEditMode ?
							textEditSubmitHandler :
							textNewSubmitHandler
						}
					>
					{
						props.isEditMode ? "Edit" : "Send"
					}
					</button>
					
				</div>
			</div>
			
		</Fragment>
		);
};

export default TextEditor;


