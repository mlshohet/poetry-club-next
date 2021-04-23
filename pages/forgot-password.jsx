import ForgotPassWordForm from '../components/forgot-password/forgot-password';

function ForgotPassWordPage(props) {

	return (
		<ForgotPassWordForm />
	);
}

export async function getStaticProps() {
	  const auth = true;

	  return {
	    props: {
	      auth,
	    }
	  }
};

export default ForgotPassWordPage;