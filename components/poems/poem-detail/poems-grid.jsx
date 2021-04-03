import { useState, useEffect } from 'react';

import { getSession } from 'next-auth/client';

import PoemItem from './poem-item';
import { getPoet } from '../../../lib/poets-utils';

import classes from './poems-grid.module.css';


function PoemsGrid({ poet, poems }) {

	if (!poet) {
		return <h1>Loading</h1>
	}

	const { name, _id } = poet;

	const [data, setData] = useState(false);
	const [isInReadingList, setIsInReadingList] = useState(false);

	useEffect(() => {
		return getSession().then(session => {
			if (session) {
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
					<li>Poems</li>
					<li>Reading List</li>
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