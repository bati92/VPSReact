import PropTypes from 'prop-types';
import { getData } from '@utils/getData';
import PageLayoutServices from '@components/page-layout-services';
import myStaticServices from '../../data/my-static-services.json';

export async function getServerSideProps(_context) {
	const data = await getData(`data-communications`);
	return {
		props: {
			...data
		}
	};
}

const Home = ({ myItems, className }) => {
	const staticItem = myStaticServices.find(
		(item) => item.slug === 'data-communication'
	);
	const hasSections = staticItem ? staticItem.hasSections : null;

	return (
		<PageLayoutServices
			pageTitle="البيانات والاتصالات"
			items={myItems?.dataCommunications?.data}
			resourceType="data-communication"
			hasSection={hasSections}
			className={className}
		/>
	);
};

Home.propTypes = {
	myItems: PropTypes.shape({
		dataCommunications: PropTypes.shape({
			data: PropTypes.arrayOf(
				PropTypes.shape({
					id: PropTypes.number.isRequired,
					title: PropTypes.string.isRequired
					// Add other relevant fields based on the structure of your data
				})
			)
		})
	}),
	className: PropTypes.string
};

export default Home;
