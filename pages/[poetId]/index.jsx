import { Fragment, useEffect, useState } from 'react';

import { getSession } from 'next-auth/client';

import Head from 'next/head';

import MenuBookIcon from '@material-ui/icons/MenuBook';
import PeopleIcon from '@material-ui/icons/People';
import FavoriteIcon from '@material-ui/icons/Favorite';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import PoemItem from '../../components/poems/poem-detail/poem-item';
import ReadingListItem from '../../components/featured-poets/featured-poets-item';
import Loading from '../../components/loading';
import Empty from '../../components/empty';

import { getPoet } from '../../lib/poets-utils';

import classes from './poet-page.module.css';

function PoetPage({ poet, poemsSorted }) {

	const { name, _id, readingList, email } = poet;
	const pageReadingList = readingList;

	const [data, setData] = useState();
	const [pageReadingListPoets, setPageReadingListPoets] = useState();
	const [isInReadingList, setIsInReadingList] = useState(false);
	const [showReadingList, setShowReadingList] = useState(false);
	const [isSelf, setIsSelf] = useState(false);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => { 
		async function getActiveSession() {
			const session = await getSession();
			if (session) {
		
				const user = await getPoet(session.user.userId);
				if (user) {
					setData(user);
				}
				if (user.poet.email === email) {
					setIsSelf(true);
				} else {
					setIsSelf(false);
				}

				const userReadingList = user.poet.readingList;
				const inReadingList = userReadingList.filter(poetId => poetId === _id).length;
				if (inReadingList > 0 ) {
					setIsInReadingList(true)
					setIsLoading(false);
				} else {
					setIsInReadingList(false);
					setIsLoading(false);
				}
			} else {
				setIsLoading(false);
			}
		}
		setShowReadingList(false);
		getActiveSession();
	}, [name]);

	if (isLoading) {

		return (
			<Fragment>
				<Head>
					<title>Noontide Poetry Club - Poet Page</title>
					<meta 
						name="description"
						content="Poet's page"
					/>
				</Head>
				<Loading />
			</Fragment>
		) 
			
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
			<Head>
				<title>Noontide Poetry Club - {poet.name}</title>
				<meta 
					name="description"
					content={`${poet.name} poetry`}
				/>
			</Head>
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
						<MenuBookIcon />
					</li>
					<li 
						onClick={getReadingListPoets}
						className={
							showReadingList ?
							classes.active :
							classes.inactive
						}
					>
						<PeopleIcon />
					</li>
					{
						
						isSelf || !data ? '' :
						(<li> 
							{
								!isInReadingList ?
									<div className={classes.delete} onClick={onAddHandler}><FavoriteIcon /></div> :
									<div className={classes.delete} onClick={onRemoveHandler}><RemoveCircleIcon /></div>
							} 
						</li>)
					}
				</ul>
				</div>
				{
					showReadingList && <div>
					{
						pageReadingList.length > 0 ? 
						(
							<div className={classes.readingList}>
								{
									pageReadingListPoets.map(poet =>
									 	(
									 		<div 
									 			key={poet._id}
									 			className={classes.readingListItem}
									 		>
										 		<div className={classes.itemImage}>
											 		<ReadingListItem 	
												 		imageUrl={poet.imageUrl}
												 		name={poet.name}
												 		slug={poet.slug}
													/>
												</div>
												<div className={classes.itemName}>{poet.name}</div>
											</div>
										)
									)
								}
							</div>
						) : <Empty />
					}
					</div>
				}
				{
					!showReadingList && <div className={classes.poems}>
						{ 
							poemsSorted.length > 0 ?
							(
								<div>
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
							) : <Empty />
						}
					</div>
				}
			</div>
		</div>
	);
};

export async function getStaticProps(context) {

	const { params } = context;

	const id = params.poetId;
	
	let data;

	try {
		data = await getPoet(id);
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

	const poetSlugs = poets.map(poet => poet.slug);

	const pathsWithParams = poetSlugs.map(poetSlug => ({
		params: {
			poetId: poetSlug
		}
	}));

	return {
		paths: pathsWithParams,
		fallback: false
	};
};


export default PoetPage;
