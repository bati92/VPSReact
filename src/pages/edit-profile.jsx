import { useState, useEffect } from 'react';
import SEO from '@components/seo';
import Wrapper from '@layout/wrapper';
import Header from '@layout/header/header-02';
import Footer from '@layout/footer/footer-02';
import Breadcrumb from '@components/breadcrumb';
import EditProfileArea from '@containers/edit-profile';
import withAuth from '@components/auth/withAuth';
import LoadingSpinner from '@components/spinner/index';
import TopBarArea from '@containers/top-bar';
import axios from 'axios';

export async function getStaticProps() {
	return {
		props: {
			className: 'template-color-1'
		}
	};
}

const EditProfile = () => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState({});

	const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
	const token = localStorage.getItem('token');

	useEffect(() => {
		const getUserData = async () => {
			try {
				const response = await axios.get(
					`${apiBaseUrl}/logged-in-user`,
					{
						headers: {
							Authorization: `Bearer ${token}`
						}
					}
				);
				setUser(response.data);
				setLoading(false);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error('Error fetching user data', error);
				setLoading(false);
			}
		};
		getUserData();
	}, [apiBaseUrl, token]);

	if (loading) return <LoadingSpinner />;

	return (
		<Wrapper>
			<SEO pageTitle="تعديل الملف الشخصي" />
			<Header />
			<TopBarArea />
			<main id="main-content">
				<Breadcrumb
					pageTitle="تعديل الملف الشخصي"
					currentPage="Edit Profile"
				/>
				<EditProfileArea authUser={user} token={token} />
			</main>
			<Footer />
		</Wrapper>
	);
};

export default withAuth(EditProfile);
