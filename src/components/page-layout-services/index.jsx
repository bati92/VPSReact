import PropTypes from 'prop-types';
import SEO from '@components/seo';
import Wrapper from '@layout/wrapper';
import Header from '@layout/header/header-02';
import Footer from '@layout/footer/footer-02';
import ExploreServiceArea from '@containers/explore-service/all-services';
import { normalizedData } from '@utils/methods';
import homepageData from '../../data/homepages/home-08.json';

const PageLayoutSection = ({
	pageTitle,
	items,
	sectionId,
	resourceType,
	hasSection
}) => {
	const content = normalizedData(homepageData?.content || []);

	return (
		<Wrapper>
			<SEO pageTitle={pageTitle} />
			<Header />
			<main
				id="main-content"
				className="rn-nft-mid-wrapper nft-left-sidebar-nav pr--40 pr_sm--15 pt-5"
			>
				{!items || items.length === 0 ? (
					<h2 className="text-center">لا توجد بيانات متاحة</h2>
				) : (
					<ExploreServiceArea
						sectionTitle={pageTitle}
						id="list-item-3"
						space={2}
						hasSection={hasSection}
						data={{
							...content['explore-product-section'],
							parentSlug: resourceType,
							sectionId,
							products: items
						}}
					/>
				)}
			</main>
			<Footer className="pr--40" />
		</Wrapper>
	);
};

// Updated PropTypes validation
PageLayoutSection.propTypes = {
	pageTitle: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			name: PropTypes.string
			// Add other properties as needed for better validation
		})
	).isRequired,
	sectionId: PropTypes.string.isRequired,
	resourceType: PropTypes.string.isRequired,
	hasSection: PropTypes.bool.isRequired
};

export default PageLayoutSection;
