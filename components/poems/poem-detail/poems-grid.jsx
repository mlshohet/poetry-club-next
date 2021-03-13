import PoemItem from './poem-item';

import classes from './poems-grid.module.css';

function PoemsGrid(props) {
	const { poems } = props;

	return (
		<ul className={classes.grid}>
			{ 
				poems.map(poem =>
					<PoemItem 
						key={poem.title}
						poem={poem}
					/>
				)
			}
		</ul>
	);
};

export default PoemsGrid;