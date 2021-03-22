import { Fragment, useState, useEffect, useRef } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';


import classes from './submission-form.module.css';
import Notification from '../ui/notification';

function TextEditor() {

	const focused = useRef();
	useEffect(() => focused.current.focus(), []);

	const [poetId, setPoetId] = useState('wbyeats');

	const [isIActive, setIsIActive] = useState(false);
	const [editorState, setEditorState] = useState(
		() => EditorState.createEmpty(),
	);

	async function submissionHandler(poetId) {
		event.preventDefault();
		
		const submission = editorState.getCurrentContent();
		const rawJS = convertToRaw(submission);
		console.log("Raw: ", rawJS);
		const poemId = rawJS.blocks[0].key

		const date = new Date().toLocaleDateString('en-US', {
					day: 'numeric',
					month: 'long',
					year: 'numeric' 
		});

		console.log("Poet id from submission:", poetId);
		
		try {
			const response = await fetch(`http://localhost:3000/api/${poetId}`, {
				method: 'POST',
				body: JSON.stringify({
					text: rawJS,
					date: date,
					poemId: poemId,
				}),
				headers: {
					'Content-Type': 'application/json'
				},
			});

			const data = await response.json();
			console.log("Response from post: ", data.poem);

			if (!response.ok) {
				throw new Error("Something went wrong");
				return;
			}
			
			
			setEditorState(() => EditorState.createEmpty());
	
		} catch (error) {
			throw new Error(error);
		}
	};

	function getContent() {

		const submission = editorState.getCurrentContent();
  
		const rawJS = convertToRaw(submission);
		const text = rawJS.blocks;

		let lineArr;
		let finalText = '<p>';

		text.map(line => {

			lineArr = line.text.split('');
			lineArr.map((letter, i) => {
				if (letter === "<") {
					lineArr.splice(i+1, 0, "&zwnj;");
				}
			});

			if (line.inlineStyleRanges.length !== 0) {
				line.inlineStyleRanges.map(style => {
						const { offset, length } = style;
						lineArr.splice(offset, 0, '<i>');
						lineArr.splice(offset + length + 1, 0, '</i>');
					}
				);

				finalText = finalText.concat(lineArr.join('')+'\n');
			} else {
				finalText = finalText.concat(lineArr.join('')+'\n');
			}
		});

		const parser = new DOMParser();
		const htmlDoc = parser.parseFromString(finalText, "text/html");
		const outputDiv = document.getElementById("output"); // id of where to append the children
		const p = htmlDoc.querySelectorAll("p"); // children of the first paragraph in the HTML doc of text
		for (let node of p) {
			outputDiv.appendChild(node);
		}
		console.log("Text ", finalText);
	}

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
					<button 
						className={classes.buttonStylePublish}
						onClick={() => submissionHandler(poetId)}
					>
						Publish
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


