import SEO from '@components/seo';
import Wrapper from '@layout/wrapper';
import Header from '@layout/header/header-02';
import Footer from '@layout/footer/footer-02';
import TopBarArea from '@containers/top-bar';
import ActivityArea from '@containers/ranking_1';
import { useState, useEffect } from 'react';
import withAuth from '@components/auth/withAuth';
import axios from 'axios';

export async function getStaticProps() {
	return { props: { className: 'template-color-1' } };
}

const Home = () => {
	const [auth, setAuth] = useState('');
	const [orders, setOrders] = useState([]);

	const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

	// Fetch user data when the page loads
	useEffect(() => {
		const fetchauth = async () => {
			try {
				const token = localStorage.getItem('token');
				const result = await axios.get(`${apiBaseUrl}/logged-in-user`, {
					headers: {
						Authorization: `Bearer ${token}` // Pass token in Authorization header
					}
				});

				setAuth(result.data); // Set user data
			} catch {}
		};

		fetchauth();
	}, [apiBaseUrl]);

	// Fetch agent data when auth is available
	useEffect(() => {
		if (auth) {
			const fetchAgents = async () => {
				try {
					const token = localStorage.getItem('token');
					const result = await axios.get(
						`${apiBaseUrl}/myRequests/${auth.id}`,
						{
							headers: {
								Authorization: `Bearer ${token}` // Pass token in Authorization header
							}
						}
					);

					setOrders(result.data.orders);
				} catch {}
			};

			fetchAgents();
		}
	}, [auth, apiBaseUrl]);

	return (
		<Wrapper>
			<SEO pageTitle="myRequests" />
			<Header />
			<TopBarArea />
			<main id="main-content">
				<ActivityArea data={orders} />
			</main>
			<Footer />
		</Wrapper>
	);
};

export default withAuth(Home);
