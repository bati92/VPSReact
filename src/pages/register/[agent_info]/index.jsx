import PropTypes from 'prop-types';
import SEO from '@components/seo';
import Wrapper from '@layout/wrapper';
import Breadcrumb from '@components/breadcrumb';
import SignUpArea from '@containers/signup-agent';

export async function getServerSideProps(context) {
	const agent_info = ` ${context.query.agent_info}`;

	return {
		props: {
			agent_info
		}
	};
}

const SignUp = ({ agent_info }) => (
	<Wrapper>
		<SEO pageTitle="انشاء حساب جديد" />
		<main id="main-content">
			<Breadcrumb pageTitle="انشاء حساب جديد" currentPage="Sign Up" />
			<SignUpArea agent_info={agent_info} />
		</main>
	</Wrapper>
);

SignUp.propTypes = {
	agent_info: PropTypes.string.isRequired
};

export default SignUp;
