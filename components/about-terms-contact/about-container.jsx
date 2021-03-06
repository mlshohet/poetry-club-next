import classes from './about.module.css';

function AboutContainer() {
	return (
		<div className={classes.aboutContainer}>
			<div className={classes.about}>
				<h3>About</h3>
				<div>
					<p>
						This app is meant to be used for entertainment, education, and self-expression only.
					</p>
					<p>
						All work posted is the property of its respective creator, or their copyright holder, and is posted publicly with the creator's permission, or according to fair use license.
					</p>
				</div>
			</div>
			<div className={classes.terms}>
				<h3>Terms of Use</h3>
				<p>
					We celebrate freedom of language and contemplate all facets of the human condition, but please use discretion when posting.
				</p>
			</div>
			<div className={classes.contact}>
				<h3>Contact</h3>
				<p>
					For general questions, concerns and inquiries (or if you would like to be profiled in the spotlight section,) please email us at<br />
					noontidepoetryclub(at)gmail(dot)com.
				</p>
			</div>
		</div>
	)
}

export default AboutContainer;