import { useState, useEffect } from 'react';

import { getSession } from 'next-auth/client';

import ReadingListContainer from '../components/reading-list/reading-list-container';

import Loading from '../components/loading';

import { getPoet, getReadingListPoets } from '../lib/poets-utils';

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
		<ReadingListContainer data={data} />
	);
};

export default ReadingList;
