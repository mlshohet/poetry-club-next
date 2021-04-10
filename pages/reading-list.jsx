import { useState, useEffect } from 'react';

import { getSession } from 'next-auth/client';

import ReadingListItem from '../components/featured-poets/featured-poets-item';

import Loading from '../components/loading';
import Empty from '../components/empty';

import { getPoet, getReadingListPoets } from '../lib/poets-utils';

import classes from './reading-list.module.css';

function ReadingList() {
	const [data, setData] = useState();
	
	useEffect(() => {
		async function getReadingList() {
			const session = await getSession();
			if (session) {
				const userId = session.user.userId;
				const currentUser = await getPoet(userId);

				if (currentUser) {
					const readingList = currentUser.poet.readingList;
					const readingListPoets = await getReadingListPoets(readingList);
					if (readingListPoets) {
						setData(readingListPoets);
					}
				}
			}
		};
		getReadingList();
	}, []);

	if (!data) {
		return <Loading />
	}
	
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

export default ReadingList;
