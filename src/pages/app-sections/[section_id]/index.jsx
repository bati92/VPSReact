import PropTypes from 'prop-types';
import { getData } from '@utils/getData';
import PageLayoutServices from '@components/page-layout-services';
import myStaticServices from '../../../data/my-static-services.json';

export async function getServerSideProps(context) {
	const data = await getData(`app-sections/${context.query.section_id}`);
	return {
		props: {
			...data,
			sectionId: context.query.section_id
		}
	};
}

const Home = ({ myItems, sectionId }) => {
	const staticItem = myStaticServices.find((item) => item.slug === 'app');
	const hasSections = staticItem ? staticItem.hasSections : null;

	return (
		<PageLayoutServices
			pageTitle="التطبيقات"
			items={myItems?.apps}
			resourceType="app"
			sectionId={sectionId}
			hasSection={hasSections}
		/>
	);
};

Home.propTypes = {
	myItems: PropTypes.shape({
		apps: PropTypes.arrayOf(PropTypes.object) // Use arrayOf for better validation
	}),
	sectionId: PropTypes.string.isRequired
};

export default Home;
