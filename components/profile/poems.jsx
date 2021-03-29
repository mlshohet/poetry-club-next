import { Fragment, useContext, useState, useRef } from 'react';

import TextEditor from '../text-editor/text-editor';
import TextEditorContext from '../../store/text-editor-context';

import Poem from './poem';

import classes from './poems.module.css';

function Poems(props) {

	const { poet } = props;
	const poems = poet.poems;

	const textEditorContext = useContext(TextEditorContext);
	const editorState = textEditorContext.editorState;

	const editorRef = useRef();

	const editText = textEditorContext.editText;
	const newText = textEditorContext.newText;

	const isEditMode = textEditorContext.isEditMode;

	function handleEdit(poemId) {
		const poemToEdit = poems.filter(poem => poem.poemId === poemId);
		editText(poemToEdit[0].text);
		editorRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
			inline: 'center'
		});
	};

	function handleNew() {
		newText();
		editorRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
			inline: 'center'
		});
	};
	
	return (
		
		<Fragment>
		
			<div className={classes.poemsContainer}>
				<h1>{poet.name}</h1>
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
							 	getPoemId={() => handleEdit(poem.poemId)}
							/>
						)
					)
				}
				</div>
				<div ref={editorRef}>
				<TextEditor
					isEditMode={isEditMode}
					editorState={editorState}
				/>
			</div>
		</Fragment>
	);
};

export default Poems;