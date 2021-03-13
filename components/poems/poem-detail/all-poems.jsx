import classes from './all-posts.module.css';
import PoemGrid from './poem-grid';


function AllPoems(props) {
	return (
		<section className={classes.posts}>
			<h1>
				All Poems
			</h1>
			<PoemGrid posts={props.posts} />
		</section>
	);
};

export default AllPoems;