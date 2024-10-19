import PropTypes from 'prop-types';
import { getData } from '@utils/getData';
import PageLayoutSections from '@components/page-layout-sections';

export async function getServerSideProps() {
	const data = await getData('ecard-sections');
	return {
		props: {
			...data
		}
	};
}

const Home = ({ myItems, className }) => (
	<PageLayoutSections
		pageTitle="البطاقات الإلكترونية"
		items={myItems?.ecardSections?.data}
		resourceType="ecard"
		className={className}
	/>
);

Home.propTypes = {
	myItems: PropTypes.shape({
		ecardSections: PropTypes.shape({
			data: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.number.isRequired, // Example property
					name: PropTypes.string.isRequired // Example property
					// Add other properties of your objects here
				})
			)
		})
	}).isRequired,
	className: PropTypes.string
};

export default Home;
