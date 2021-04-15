import { useState, useEffect } from 'react';

import { getSession } from 'next-auth/client';

import ReadingListContainer from '../components/reading-list/reading-list-container';

import Loading from '../components/loading';
import Empty from '../components/empty';

import { getPoet, getReadingListPoets } from '../lib/poets-utils';

function ReadingList() {
	const [data, setData] = useState();
	const [isEmpty, setIsEmpty] = useState(false);
	
	useEffect(() => {
		async function getReadingList() {
			const session = await getSession();
			if (session) {
				const userId = session.user.userId;
				const currentUser = await getPoet(userId);

				if (currentUser) {
					const readingList = currentUser.poet.readingList;
					if (readingList.length === 0) {
						setIsEmpty(true);
						return;
					}
					const readingListPoets = await getReadingListPoets(readingList);
					if (readingListPoets) {
						setData(readingListPoets);
						return;
					}
				}
			}
		};
		getReadingList();
	}, []);

	if (isEmpty) {
		return <Empty />
	}

	if (!data) {
		return <Loading />
	}

	
	
	return (
		<ReadingListContainer data={data} />
	);
};

export default ReadingList;
