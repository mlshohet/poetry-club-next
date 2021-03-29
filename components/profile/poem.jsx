import classes from './poem.module.css';

function Poem (props) {
	const { poem, poemId, getPoemId } = props;

	return (
		<div className={classes.poemContainer}>
			<div>
				<p>{ poem.text.blocks[0].text }</p>
			</div>
			<div className={classes.buttonContainer}>
				<button type="button" onClick={getPoemId}>Edit</button>
				<button>Delete</button>
			</div>			
		</div>
	);
};

export default Poem;