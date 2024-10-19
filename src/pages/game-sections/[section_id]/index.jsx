import PropTypes from 'prop-types'; // Move this import above
import { getData } from '@utils/getData';
import PageLayoutServices from '@components/page-layout-services';
import myStaticServices from '../../../data/my-static-services.json';

export async function getServerSideProps(context) {
	const data = await getData(`game-sections/${context.query.section_id}`);
	return {
		props: {
			...data,
			sectionId: context.query.section_id
		}
	};
}

const Home = ({ myItems, sectionId }) => {
	const foundItem = myStaticServices.find((item) => item.slug === 'game');
	const hasSections = foundItem ? foundItem.hasSections : null;
	return (
		<PageLayoutServices
			pageTitle="الألعاب"
			items={myItems?.games}
			resourceType="game"
			sectionId={sectionId}
			hasSection={hasSections}
		/>
	);
};

Home.propTypes = {
	myItems: PropTypes.shape({
		games: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number.isRequired,
				name: PropTypes.string.isRequired
				// Add more fields based on your data structure
			})
		)
	}),
	sectionId: PropTypes.string.isRequired
};

export default Home;
