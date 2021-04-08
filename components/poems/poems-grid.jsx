import PoemItem from './poem-detail/poem-item';
import Loading from '../loading';

function PoemsGrid(props) {

	const { poems } = props; 

	if (!poems) {
		return <Loading />
	}

	return (
		<div className="gridContainer">
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
	)
};

export default PoemsGrid;