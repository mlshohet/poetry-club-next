import { useState, useEffect } from 'react';

import { getSession } from 'next-auth/client';

import PoemItem from './poem-item';
import ReadingListItem from '../../featured-poets/featured-poets-item';
import { getPoet } from '../../../lib/poets-utils';

import classes from './poems-grid.module.css';


function PoemsGrid({ poet, poems }) {

	if (!poet) {
		return <h1>Loading</h1>
	}

	console.log("Poet: ", poet);
	const { name, _id, readingList } = poet;
	const pageReadingList = readingList;
	console.log("Item readoding list: ", pageReadingList);

	const [data, setData] = useState();
	const [pageReadingListPoets, setPageReadingListPoets] = useState();
	const [isInReadingList, setIsInReadingList] = useState(false);
	const [showReadingList, setShowReadingList] = useState(false);

	const [isSession, setIsSession] = useState(false);

	useEffect(() => {
		return getSession().then(session => {
			if (session) {
				setIsSession(true);
				getPoet(session.user.email).then(data => {
					if (data) {
						const userReadingList = data.poet.readingList;
						const inReadingList = userReadingList.filter((poetId) => poetId === _id ).length;
						if (inReadingList > 0) {
							setIsInReadingList(true)
							setData(data);
						} else {
							setData(data)
						}
					}
				})
			}
		});
	}, []);

	if (isSession && !data) {
		return <h1> Loading </h1>
	}
	//const userReadingList = data.poet.readingList;

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

		console.log("Data from reading list: ", data);

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
						data && 
						<li> 
							{
								!isInReadingList ?
									<span onClick={onAddHandler}>Add</span> :
									<span onClick={onRemoveHandler}>Remove</span>
							} 
						</li>
					}
				</ul>
				</div>
				{
					showReadingList && <div>
					{
						pageReadingList.length > 0 && 
						<div className={classes.readingList}>
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
							poems.map(poem =>
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

export default PoemsGrid;