import { useContext } from 'react';

import { useRouter } from 'next/router';

import DeleteIcon from '@material-ui/icons/Delete';

import TextEditorContext from '../../store/text-editor-context';

import classes from './poem.module.css';

function Poem (props) {
	const { poem, handleEdit, handleNew } = props;

	const textEditorContext = useContext(TextEditorContext);
	const setContextPoemId = textEditorContext.setPoemId;

	const resetTextEditor = textEditorContext.newText;
	const setEditMode = textEditorContext.setIsEditMode;

	const router = useRouter();

	async function deleteSubmitHandler() {

		let response;
		let data;
		try {
				response = await fetch(`http://localhost:3000/api/user/delete-poem/${poem.poemId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
			});

			data = await response.json();

			if (!response.ok) {
				throw new Error("No response on delete!");
			}
		} catch (error) {
			console.log(error, error.message, "Could not delete!");
			return;
		}

		resetTextEditor();
		setEditMode(false);
		console.log("Successfully deleted!", data);
		router.replace('/poems');
	}


	function handleEditPoem() {
		setContextPoemId(poem.poemId);
		handleEdit(poem.poemId);
	}

	return (
		<div className={classes.poemContainer}>
			<div className={classes.poem}>
				<p classes={classes.ellipsis}>{ poem.text.blocks[0].text }</p>
			</div>
			<div className={classes.buttonContainer}>
				<button onClick={handleEditPoem}>Edit</button>
				<div className={classes.delete} onClick={deleteSubmitHandler}><DeleteIcon /></div>
			</div>			
		</div>
	);
};

export default Poem;