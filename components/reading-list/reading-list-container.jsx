import ReadingListItem from '../featured-poets/featured-poets-item';
import Empty from '../empty';

import classes from './reading-list.module.css';

function ReadingListContainer (props) {

	const { data } = props;

	return (
		<div className={classes.readingListContainer}>
				<div className={classes.readingList}>
					{
						data.readingList.length > 0 ?
							data.readingList.map(poet =>
								(
									<div 
							 			key={poet._id}
							 			className={classes.readingListItem}
							 		>
							 			<div className={classes.itemImage}>
											<ReadingListItem 
												name={poet.name}
												imageUrl={poet.imageUrl}
												slug={poet.slug}
											/>
										</div>
										<div className={classes.itemName}>{poet.name}</div>
									</div>
								)
							) : <Empty />
					}
				</div>
			</div>
	);
};

export default ReadingListContainer;