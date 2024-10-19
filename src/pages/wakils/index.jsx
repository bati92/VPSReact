import SEO from '@components/seo';
import Wrapper from '@layout/wrapper';
import Header from '@layout/header/header-02';
import Footer from '@layout/footer/footer-02';
import TopBarArea from '@containers/top-bar';
import ActivityArea from '@containers/activity';
import { useState, useEffect } from 'react';
import axios from 'axios';
import withAuth from '@components/auth/withAuth';

export async function getStaticProps() {
	return { props: { className: 'template-color-1' } };
}

const Home = () => {
	const [agents, setAgents] = useState([]);

	const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

	useEffect(() => {
		const fetchauth = async () => {
			try {
				const token = localStorage.getItem('token');
				await axios.get(`${apiBaseUrl}/logged-in-user`, {
					headers: {
						Authorization: `Bearer ${token}` // Pass token in Authorization header
					}
				});
				// Perform any actions if needed with the fetched data
			} catch {}
		};
		fetchauth();

		const fetchAgents = async () => {
			try {
				const token = localStorage.getItem('token');
				const result = await axios.get(`${apiBaseUrl}/agents/A`, {
					headers: {
						Authorization: `Bearer ${token}` // Pass token in Authorization header
					}
				});

				setAgents(result.data.agents);
			} catch (error) {}
		};
		fetchAgents();
	}, [apiBaseUrl]);

	return (
		<Wrapper>
			<SEO pageTitle="agents" />
			<Header />
			<TopBarArea />
			<main id="main-content">
				<ActivityArea data={agents} />
			</main>
			<Footer />
		</Wrapper>
	);
};

export default withAuth(Home);
