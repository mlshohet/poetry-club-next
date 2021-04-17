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

	if (!session || loading) {
		return <h1> Loading </h1>
	}
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

		if (!submission.hasText()) {
			alert("Please don't submit empty documents.");
			return;
		}

		let response;
		let data;
		try {
				response = await fetch(`/api/user/edit-poem/${poemId}`, {
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
			alert("Could not edit.");
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

		if (!submission.hasText()) {
			alert("Please don't submit empty documents.");
			return;
		}

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
			response = await fetch(`/api/user/post-poem`, {
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

			data = await response.json();

			if (!response.ok) {
				throw new Error("Could not submit!");
			}

		} catch (error) {
			if (response.status === 405) {
				alert("You have reached the maximum number of documents.");
			} else {
				alert("Could not send document.");
			}
			return;
		}
		setEditorState(() => EditorState.createEmpty());
		router.replace('/poems');
	};

	const MAX_LENGTH = 10000;

	function handleBeforeInput() {
		const currentContent = editorState.getCurrentContent()
		const currentContentLength = currentContent.getPlainText('').length;
		const selectedTextLength = getLengthOfSelectedText();

		if (currentContentLength - selectedTextLength >= MAX_LENGTH) {
			alert("Reached maximum length allowed.");
			return 'handled';
		}
	};

	function getLengthOfSelectedText() {
		const currentSelection = editorState.getSelection();
		const isCollapsed = currentSelection.isCollapsed();

		let length = 0;

		if (!isCollapsed) {
			const currentContent = editorState.getCurrentContent();
			const startKey = currentSelection.getStartKey();
			const endKey = currentSelection.getEndKey();
			const startBlock = currentContent.getBlockForKey(startKey);

			const startAndEndBlockSame = startKey === endKey;

			const startBlockTextLength = startBlock.getLength();
			
			const startSelectedTextLength = startBlockTextLength - curentSelection.getStartOffset();
			const endSelectedTextLength = currentSelection.getEndOffset();

			const keyAfterEnd = currentContent.getKeyAfter(endKey);

			if (startAndEndBlockSame) {
				length += currentSelection.getEndOffset() - currentSelection.getStartOffset();	
			} else {
				let currentKey = startKey;

				while (currentKey && currentKey !== keyAfterEnd) {
					if (currentKey === startKey) {
						length += startSelectedTextLength + 1;
					} else if (currentKey === endKey) {
						length += endSelectedTextLength;
					} else {
						length += currentContent.getBlockForKey(currentKey).getLength() + 1;
					}

					currentKey = currentContent.getKeyAfter(currentKey);
				};
			}
		}

		return length;
	};

	function handlePastedText(pastedText) {
		const currentContent = editorState.getCurrentContent();
		const currentContentLength = currentContent.getPlainText('').length;
		const selectedTextLength = getLengthOfSelectedText();

		if (currentContentLength + pastedText.length - selectedTextLength > MAX_LENGTH) {
			alert("Reached maximum length allowed.");
			return 'handled';
		}
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
						handleBeforeInput={handleBeforeInput}
						handlePastedText={handlePastedText}
					/>
				</div>
				<div className={classes.actions}>
					<button
						className={classes.buttonStylePublish}
						onClick={props.handleNew}
					>
						Cancel
					</button>
					
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


