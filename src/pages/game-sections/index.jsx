import { getData } from '@utils/getData';
import PropTypes from 'prop-types'; // Import PropTypes
import PageLayoutSections from '@components/page-layout-sections';

export async function getStaticProps() {
	const data = await getData('game-sections');
	return {
		props: {
			...data
		}
	};
}

const Home = ({ myItems }) => (
	<PageLayoutSections
		pageTitle="الألعاب"
		items={myItems?.gameSections?.data}
		resourceType="game"
	/>
);

Home.propTypes = {
	myItems: PropTypes.shape({
		gameSections: PropTypes.shape({
			data: PropTypes.arrayOf(
				PropTypes.shape({
					// Define the expected shape of each item in the array
					id: PropTypes.number.isRequired,
					name: PropTypes.string.isRequired
					// Add other fields if needed
				})
			).isRequired
		}).isRequired
	}).isRequired
};

export default Home;
