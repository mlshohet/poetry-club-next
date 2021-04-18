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

import { connectToDatabase } from '../../lib/db';
import { getPoet } from '../../lib/poets-utils';

import classes from './poet-page.module.css';

function PoetPage({ poet, poemsSorted }) {

	const { _id, readingList, email } = poet;

	let name;
	if (!poet.name || poet.name === '') {
		name = "Unknown"
	} else {
		name = poet.name;
	};

	let pageReadingList = readingList;

	const [data, setData] = useState();
	const [pageReadingListPoets, setPageReadingListPoets] = useState();
	const [isInReadingList, setIsInReadingList] = useState(false);
	const [showReadingList, setShowReadingList] = useState(false);
	const [isSelf, setIsSelf] = useState(false);
	const [selfPoems, setSelfPoems] = useState();

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
					setSelfPoems(user.poet.poems.reverse());

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
	}, [email]);

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

	if (data && isSelf) {
		pageReadingList = data.poet.readingList;
	}

	async function getReadingListPoets() {
		if (!pageReadingList || pageReadingList.length === 0) {
			setPageReadingListPoets(null);
			setShowReadingList(true)
			return;
		}

		let data;
		try {
			const response = await fetch(`/api/get-reading-list/${pageReadingList}`);

			data = await response.json();

			if (!response.ok) {
				throw new Error("Could not get reading list!");

			}
		} catch(error) {
			alert(error.message);
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
			alert(error.message);
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
			alert(error.message);
			return;
		}

		setIsInReadingList(false);
		return data;
	}

		return (
		<div className={classes.gridContainer}>
			<Head>
				<title>Noontide Poetry Club - {name}</title>
				<meta 
					name="description"
					content={`${name} poetry`}
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
						!pageReadingListPoets || pageReadingListPoets.length === 0 ? 
						<Empty /> :
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
						)
					}
					</div>
				}
				{
					!showReadingList && <div className={classes.poems}>
						{ 
							isSelf ? (
								selfPoems.length > 0 ? 
								(
									<div>
									{
										selfPoems.map(poem =>
											<PoemItem 
												key={poem.text.blocks[0].key}
												poem={poem.text.blocks}
												date={poem.date}
											/>
										)
									}
									</div> 
								) : <Empty />
							) :

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
	
	let client;

	try {
		client = await connectToDatabase();
	} catch (err) {
		throw new Error("Could not connect");
		client.close();
		return;
	}

	const collection = client.db().collection('poets');
	
	let data;

	try {
		data = await collection.findOne({ slug: id });
	} catch (error) {
		throw new Error("Could not find profile.");
		client.close();
		return;
	}

	client.close();

	const poet = { 
		_id: data._id.toString(),
		slug: data.slug,
		name: data.name,
		email: data.email,
		poems: data.poems,
		isFeatured: data.isFeatured,
		readingList: data.readingList,
		imageUrl: data.imageUrl,
	}
	
	
	const poems = poet.poems;
	const poemsSorted = poems.reverse();

	return {
		props: {
			poet,
			poemsSorted,
		},

		revalidate: 1,	
	};
};

export async function getStaticPaths() {
	
	let client;

	try {
		client = await connectToDatabase();
	} catch (err) {
		throw new Error("Could not connect");
		client.close();
		return;
	}

	const collection = client.db().collection('poets');
	
	let data;

	try {
		const cursor = await collection.find({});
		data = await cursor.toArray();
	} catch (error) {
		throw new Error("Could not find profile.");
		client.close();
		return;
	}

	client.close();

	const poetSlugs = data.map(poet => poet.slug);

	const pathsWithParams = poetSlugs.map(poetSlug => ({
		params: {
			poetId: poetSlug
		}
	}));

	return {
		paths: pathsWithParams,
		fallback: 'blocking',
	};
};


export default PoetPage;
