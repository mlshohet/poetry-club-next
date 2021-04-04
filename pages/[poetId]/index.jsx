import { Fragment, useEffect, useState } from 'react';

import { getSession } from 'next-auth/client';

import PoemItem from '../../components/poems/poem-detail/poem-item';
import ReadingListItem from '../../components/featured-poets/featured-poets-item';

import { getPoet } from '../../lib/poets-utils';

import classes from './poet-page.module.css';

function PoetPage({ poet, poemsSorted }) {

	const { name, _id, readingList, email } = poet;
	const pageReadingList = readingList;

	const [data, setData] = useState();
	const [pageReadingListPoets, setPageReadingListPoets] = useState();
	const [isInReadingList, setIsInReadingList] = useState(false);
	const [showReadingList, setShowReadingList] = useState(false);
	const [isSelf, setIsSelf] = useState();

	const [isSession, setIsSession] = useState(false);

	useEffect(
		async () => {
			const session = await getSession();
			if (session) {
				setIsSession(true);
				const user = await getPoet(session.user.email);
				setData(user);

				if (user.poet.email === email) {
					setIsSelf(true);
				} else {
					setIsSelf(false);
				}

				const userReadingList = user.poet.readingList;
				const inReadingList = userReadingList.filter(poetId => poetId === _id).length;
				if (inReadingList > 0 ) {
					setIsInReadingList(true)
				} else {
					setIsInReadingList(false);
				}
			}

	}, [email]);


	if (isSession && !data) {
		return <h1> Loading </h1>
	}

	async function getReadingListPoets() {

		let data;
		try {
			const response = await fetch(`/api/get-reading-list/${pageReadingList}`);

			data = await response.json();

			if (!response.ok) {
				throw new Error("Could not get reading list!");

			}
		} catch(error) {
			console.log(error, data);
			return;
		}

		setPageReadingListPoets(data.readingList);
		setShowReadingList(true)
		return;
	}

	async function onAddHandler() {
		
		let data;
		try {
			const response = await fetch('api/user/reading-list-add', {
				method: 'PATCH',
				body: JSON.stringify({
					poetId: _id
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			data = await response.json();

			if (!response.ok) {
				throw new Error ("Could not add to list!");
			}
		} catch (error) {
			console.log(error, data);
			return;
		}

		setIsInReadingList(true);
		return data;
	}

	async function onRemoveHandler() {
		let data;
		try {
			const response = await fetch('api/user/reading-list-remove', {
				method: 'PATCH',
				body: JSON.stringify({
					poetId: _id
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			data = await response.json();

			if (!response.ok) {
				throw new Error ("Could not remove from list!");
			}
		} catch (error) {
			console.log(error, data);
			return;
		}

		setIsInReadingList(false);
		return data;
	}

		return (
		<div className={classes.gridContainer}>

			<div className={classes.grid}>
				<h1 className={classes.name}>
					{name}
				</h1>
				<div className={classes.linksContainer}>
				<ul>
					<li 
						onClick={() => setShowReadingList(false)}
						className={
							!showReadingList ?
							classes.active :
							classes.inactive
						}
					>
						Poems
					</li>
					<li 
						onClick={getReadingListPoets}
						className={
							showReadingList ?
							classes.active :
							classes.inactive
						}
					>
						Reading List
					</li>
					{
						
						isSelf || !data ? '' :
						(<li> 
							{
								!isInReadingList ?
									<span onClick={onAddHandler}>Add</span> :
									<span onClick={onRemoveHandler}>Remove</span>
							} 
						</li>)
					}
				</ul>
				</div>
				{
					showReadingList && <div>
					{
						pageReadingList.length > 0 && 
						<div onClick={() => setShowReadingList(false)} className={classes.readingList}>
							{
								pageReadingListPoets.map(poet =>
								 	(
								 		<div 
								 			key={poet._id}
								 			className={classes.readingListItem}
								 		>
									 		<ReadingListItem 	
										 		imageUrl={poet.imageUrl}
										 		name={poet.name}
										 		uname={poet.userName}
											/>
											<div className={classes.itemName}>{poet.name}</div>
										</div>
									)
								)
							}
						</div>
					}
					</div>
				}
				{
					!showReadingList && <div className={classes.poems}>
						{ 
							poemsSorted.map(poem =>
								<PoemItem 
									key={poem.text.blocks[0].key}
									poem={poem.text.blocks}
									date={poem.date}
								/>
							)
						}
					</div>
				}
			</div>
		</div>
	);
};

export async function getStaticProps(context) {

	const { params } = context;

	const poetId = params.poetId;
	
	let data;

	try {
		data = await getPoet(poetId);
	} catch (error) {
		console.log(error);
		return;
	}
	
	const poet = data.poet;
	const poems = poet.poems;
	const poemsSorted = poems.reverse();

	return {
		props: {
			poet,
			poemsSorted,
		},	
	};
};

export async function getStaticPaths() {
	
	let data;
	try {
		data = await getPoet("all");
	} catch (error) {
		console.log(error, "Could not get data!");
	}
	
	const poets = data.poet;

	const poetUserNames = poets.map(poet => poet.userName);

	const pathsWithParams = poetUserNames.map(poetUserName => ({
		params: {
			poetId: poetUserName
		}
	}));

	return {
		paths: pathsWithParams,
		fallback: false
	};
};


export default PoetPage;





