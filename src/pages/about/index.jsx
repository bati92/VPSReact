import SEO from '@components/seo';
import Wrapper from '@layout/wrapper';
import Header from '@layout/header/header-02';
import Footer from '@layout/footer/footer-02';
import CTAArea from '@containers/cta';
import { getData } from '@utils/getData';
import { useState, useEffect } from 'react';

export async function getStaticProps() {
	return {
		props: {
			className: 'template-color-1'
		}
	};
}

const About = () => {
	const [aboutUsData, setAboutUsData] = useState({});

	useEffect(() => {
		const fetchSetting = async () => {
			try {
				const data = await getData('about-us');
				setAboutUsData(data?.myItems?.setting || {});
			} catch (error) {
				console.error('Error fetching About Us data:', error);
			}
		};
		fetchSetting();
	}, []);

	return (
		<Wrapper>
			<SEO pageTitle="About" />
			<Header />
			<main id="main-content">
				<CTAArea data={aboutUsData} />
			</main>
			<Footer />
		</Wrapper>
	);
};

export default About;
