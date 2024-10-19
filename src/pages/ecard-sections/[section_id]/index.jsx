import PropTypes from 'prop-types';
import { getData } from '@utils/getData';
import PageLayoutServices from '@components/page-layout-services';
import myStaticServices from '../../../data/my-static-services.json';

export async function getServerSideProps(context) {
	const data = await getData(`ecard-sections/${context.query.section_id}`);
	return {
		props: {
			...data,
			sectionId: context.query.section_id
		}
	};
}

const Home = ({ myItems, sectionId, className }) => {
	const staticItem = myStaticServices.find(
		(service) => service.slug === 'ecard'
	);
	const hasSections = staticItem ? staticItem.hasSections : null;
	return (
		<PageLayoutServices
			pageTitle="البطاقات الإلكترونية"
			items={myItems?.ecards}
			resourceType="ecard"
			sectionId={sectionId}
			hasSection={hasSections}
			className={className}
		/>
	);
};

Home.propTypes = {
	myItems: PropTypes.shape({
		ecards: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number.isRequired, // Example property
				title: PropTypes.string.isRequired // Example property
				// Add other properties here if needed
			})
		)
	}).isRequired,
	sectionId: PropTypes.string.isRequired,
	className: PropTypes.string
};

export default Home;
