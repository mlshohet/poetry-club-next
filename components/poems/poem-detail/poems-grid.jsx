import PoemItem from './poem-item';

import classes from './poems-grid.module.css';


function PoemsGrid(props) {
	const { name, poems } = props;
	console.log("poems ", poems);

	return (
		<div className={classes.gridContainer}>

			<div className={classes.grid}>
				<h1 className={classes.name}>
					{name}
				</h1>
					{ 
					poems.map(poem =>
						<PoemItem 
							key={poem.text.blocks[0].key}
							poem={poem.text.blocks}
							date={poem.date}
						/>
					)
					}
			</div>
		</div>
	);
};

export default PoemsGrid;