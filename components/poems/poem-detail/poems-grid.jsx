import { useState, useEffect } from 'react';

import { getSession } from 'next-auth/client';

import PoemItem from './poem-item';
import { getPoet } from '../../../lib/poets-utils';

import classes from './poems-grid.module.css';


function PoemsGrid({ poet, poems }) {

	if (!poet) {
		return <h1>Loading</h1>
	}
	console.log("poems ", poet );
	const [added, setIsAdded] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const [data, setData] = useState();

	useEffect(() => {
		getSession().then(session => {
			if (session) {
				getPoet(session.user.email).then(response => {
					if (response) {
						setData(response);
						setIsLoading(false);
					}
				})
			}
		});
	}, []);

	console.log("Response: ", data);

	if (isLoading) {
		return <h3>Loading...</h3>
	} 

	
	console.log(data);

	

	const { name, _id } = poet;
	const userReadingList = data.poet.readingList;
	console.log(userReadingList);
	console.log(_id);

	const inReadingList = userReadingList.filter((poetId) => poetId === _id );
	console.log(inReadingList);

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

		console.log(data);
		setIsAdded(true);
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
					<li onClick={
						!added || !inReadingList ? onAddHandler : null
					}>
						Add
					</li>
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