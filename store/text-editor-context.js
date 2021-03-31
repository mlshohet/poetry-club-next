import { createContext, useState } from 'react';
import { Editor, EditorState, Modifier, convertToRaw, convertFromRaw } from 'draft-js';

const TextEditorContext = createContext({
	focused: null,
	setFocused: function() {},
	poemId: null,
	setPoemId: function() {},
	editorState: null,
	setEditorState: function(editorState) {},
	isEditMode: null,
	setIsEditMode: function(mode) {},
	editText : function(content) {},
	newText: function() {}
});

export function TextEditorContextProvider(props) {
	const [editorState, setEditorState] = useState(
		() => EditorState.createEmpty());
	const [isEditMode, setIsEditMode] = useState(false);
	const [poemId, setPoemId] = useState();
	const [focused, setFocused] = useState(false);

	function editTextHandler(content) {
		const newContentState = convertFromRaw(content);
		const newEditorState = EditorState.createWithContent(newContentState);
		setIsEditMode(true);
		setEditorState(newEditorState);
	}

	function newTextHandler() {
		const newEditorState = EditorState.createEmpty();
		setEditorState(newEditorState);
	}

	const context = {
		focused: focused,
		setFocused: setFocused,
		poemId: poemId,
		setPoemId: setPoemId,
		editorState: editorState,
		setEditorState: setEditorState,
		isEditMode: isEditMode,
		setIsEditMode: setIsEditMode,
		editText: editTextHandler,
		newText: newTextHandler
	};

	return (
		<TextEditorContext.Provider value={context}>
			{props.children}
		</TextEditorContext.Provider>
	);
};

export default TextEditorContext;




