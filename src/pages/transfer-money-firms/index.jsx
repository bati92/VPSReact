import PropTypes from 'prop-types'; // Move PropTypes import to the top
import { getData } from '@utils/getData';
import PageLayoutServices from '@components/page-layout-services';
import myStaticServices from '../../data/my-static-services.json';

export async function getServerSideProps() {
	const data = await getData(`transfer-money-firms`);
	return {
		props: {
			...data
		}
	};
}

const Home = ({ myItems, className }) => {
	const staticServiceItem = myStaticServices.find(
		(serviceItem) => serviceItem.slug === 'transfer-money-firm'
	);
	const hasSections = staticServiceItem
		? staticServiceItem.hasSections
		: null;

	return (
		<PageLayoutServices
			pageTitle="شركات تحويل الاموال"
			items={myItems?.transferMoneyFirms?.data}
			resourceType="transfer-money-firm"
			hasSection={hasSections}
			className={className}
		/>
	);
};

Home.propTypes = {
	myItems: PropTypes.shape({
		transferMoneyFirms: PropTypes.shape({
			data: PropTypes.arrayOf(PropTypes.shape({}))
		})
	}),
	className: PropTypes.string
};

export default Home;
