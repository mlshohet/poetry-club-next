import { createContext, useState } from 'react';
import { Editor, EditorState, Modifier, convertToRaw, convertFromRaw } from 'draft-js';

const emptyContentState = {
	  entityMap: {},
	  blocks: [
	    {
	      text: '',
	      key: 'foo',
	      type: 'unstyled',
	      entityRanges: [],
	    },
	  ],
	};

const TextEditorContext = createContext({
	editorState: null,
	isEditMode: null,
	editText : function(content) {},
	newText: function() {}
});

export function TextEditorContextProvider(props) {
	const [editorState, setEditorState] = useState(
		() => EditorState.createEmpty());
	const [isEditMode, setIsEditMode] = useState(false);

	function editTextHandler(content) {
		const newContentState = convertFromRaw(content);
		const newEditorState = EditorState.createWithContent(newContentState);
		setIsEditMode(true);
		setEditorState(newEditorState);
	}

	function newTextHandler() {
		const newEditorState = EditorState.createEmpty();
		setIsEditMode(false);
		setEditorState(newEditorState);
	}

	const context = {
		editorState: editorState,
		isEditMode: isEditMode,
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




