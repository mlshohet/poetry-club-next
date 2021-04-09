import { useState, useEffect } from 'react';

import { getSession } from 'next-auth/client';

import ReadingListItem from '../components/featured-poets/featured-poets-item';

import { getPoet, getReadingListPoets } from '../lib/poets-utils';

import classes from './reading-list.module.css';

function ReadingList() {
	const [data, setData] = useState();
	
	useEffect(() => {
		async function getReadingList() {
			const session = await getSession();
			if (session) {
				const email = session.user.email;
				const currentUser = await getPoet(email);
				console.log("email from Reading list: ", email, currentUser);
				if (currentUser) {
					const readingList = currentUser.poet.readingList;
					console.log("Reading list: ", readingList);
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
		return <h1>Loading</h1>
	}
	
	return (
		<div className={classes.readingListContainer}>
			<div className={classes.readingList}>
				{
					data.readingList.map(poet =>
						(
							<div 
					 			key={poet._id}
					 			className={classes.readingListItem}
					 		>
								<ReadingListItem 
									key={poet._id}
									name={poet.name}
									imageUrl={poet.imageUrl}
									slug={poet.slug}
								/>
								<div className={classes.itemName}>{poet.name}</div>
							</div>
						)
					)
				}
			</div>
		</div>
	);
};

export default ReadingList;
