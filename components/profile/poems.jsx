import { Fragment, useContext, useState, useRef, useEffect } from 'react';

//import TextEditor from '../text-editor/text-editor';
import TextEditorContext from '../../store/text-editor-context';

import Poem from './poem';

import { getPoet } from '../../lib/poets-utils';

import dynamic from 'next/dynamic';

const TextEditor = dynamic(() => 
	import('../text-editor/text-editor'), 
	{ ssr: false }
);

import classes from './poems.module.css';

function Poems(props) {

	const { poems } = props;


	const textEditorContext = useContext(TextEditorContext);
	
	const editorState = textEditorContext.editorState;
	const setEditorState = textEditorContext.setEditorState;

	const scrollRef = useRef();

	const editText = textEditorContext.editText;
	const newText = textEditorContext.newText;

	const isEditMode = textEditorContext.isEditMode;
	const setIsEditMode = textEditorContext.setIsEditMode;

	const focused = textEditorContext.focused;
	const setFocused = textEditorContext.setFocused;

	function handleEdit(pid) {
		const poemToEdit = poems.filter(poem => poem.poemId === pid);
		editText(poemToEdit[0].text);
		scrollRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
			inline: 'center'
		});
	};

	function handleNew() {
		setFocused(!focused);
		newText();
		scrollRef.current.scrollIntoView({
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
				<div ref={scrollRef}>
				<TextEditor
					key={focused}
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