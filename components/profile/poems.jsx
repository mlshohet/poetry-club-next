import { Fragment } from 'react';

import TextEditor from '../text-editor/text-editor';
import Poem from './poem';

import classes from './poems.module.css';

function Poems(props) {


	const { poet } = props;
	console.log("poet from poems: ", poet);
	const poems = poet.poems;
	console.log("Poems:", poems);
	console.log("Poem text:", poems[0].text.blocks[0].text);

	return (
		<Fragment>
			<h1>{poet.name}</h1>
			<div className={classes.poemsContainer}>
			{
				poems.map(poem => (
						<Poem 
							key={poem.poemId}
							poem={poem}
						/>
					)
				)
			}
			</div>
			<TextEditor poems={poems} />
		</Fragment>
	);
};

export default Poems;