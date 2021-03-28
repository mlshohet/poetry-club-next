import classes from './poem.module.css';

function Poem (props) {
	const { poem } = props;
	console.log("Poem", poem, poem.poemId);

	return (
		<div className={classes.poemContainer}>
			<div>
				<p>{ poem.text.blocks[0].text }</p>
			</div>
			<div className={classes.buttonContainer}>
				<button>Edit</button>
				<button>Delete</button>
			</div>			
		</div>
	);
};

export default Poem;