import { Fragment, useContext, useState, useRef, useEffect } from 'react';

import TextEditor from '../text-editor/text-editor';
import TextEditorContext from '../../store/text-editor-context';

import Poem from './poem';

import { getPoet } from '../../lib/poets-utils';

import classes from './poems.module.css';

function Poems(props) {

	const { poems } = props;

	const textEditorContext = useContext(TextEditorContext);
	const editorState = textEditorContext.editorState;
	const setEditorState = textEditorContext.setEditorState;

	const editorRef = useRef();

	const editText = textEditorContext.editText;
	const newText = textEditorContext.newText;

	const isEditMode = textEditorContext.isEditMode;
	const setIsEditMode = textEditorContext.setIsEditMode;

	function handleEdit(pid) {
		const poemToEdit = poems.filter(poem => poem.poemId === pid);
		editText(poemToEdit[0].text);
		editorRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
			inline: 'center'
		});
	};

	function handleNew() {
		newText();
		editorRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
			inline: 'center'
		});
	};
	
	return (
		
		<Fragment>
		
			<div className={classes.poemsContainer}>
				<div className={classes.buttonContainer}>
					<button
						className={classes.newButton}
						onClick={handleNew}
					>
						New
					</button>
				</div>
				{
					poems.map(poem => (
							<Poem 
								key={poem.poemId}
								poem={poem}
								handleEdit={handleEdit}
							/>
						)
					)
				}
				</div>
				<div ref={editorRef}>
				<TextEditor
					isEditMode={isEditMode}
					setIsEditMode={setIsEditMode}
					editorState={editorState}
					setEditorState={setEditorState}
				/>
			</div>
		</Fragment>
	);
};

export default Poems;