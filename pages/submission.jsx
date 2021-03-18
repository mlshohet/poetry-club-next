import { Fragment } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

//import SubmissionForm from '../components/submission/submission-form';

const DraftEditor = dynamic(() => import('../components/submission/submission-form-draft'), { ssr: false });

function SubmissionPage() {
	console.log("Submissin Page started");
	return (
		<Fragment>
			<Head>
				<title>Submit a Poem</title>
				<meta 
					name="description"
					content="Submit a poem"
				/>
				<meta charset="utf-8" />
			</Head>
			<DraftEditor />
		</Fragment>
	
	);
};

export default SubmissionPage;