import { Fragment } from 'react';
import Head from 'next/head';

import SubmissionForm from '../components/submission/submission-form';

function SubmissionPage() {
	return (
		<Fragment>
			<Head>
				<title>Submit a Poem</title>
				<meta 
					name="description"
					content="Submit a poem"
				/>
			</Head>
			<SubmissionForm />
		</Fragment>
	
	);
};

export default SubmissionPage;