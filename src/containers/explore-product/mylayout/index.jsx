import PropTypes from 'prop-types';
import clsx from 'clsx';
import Product from '@components/product/layout-05';
import { SectionTitleType, ProductType } from '@utils/types';

const ExploreProductArea = ({ className, space, data }) => (
	<div
		className={clsx(
			'rn-product-area',
			space === 1 && 'rn-section-gapTop',
			className
		)}
	>
		<div className="container">
			<div className="row mb--50 align-items-center">
				<div className="col-lg-6 col-md-6 col-sm-6 col-12" />
			</div>

			<div className="row g-5">
				{data && data.products && data.products.length > 0 ? (
					data.products.map((prod) => (
						<div
							key={prod.id}
							className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
						>
							<Product
								overlay
								title={prod.name}
								image={prod.image_url} // تأكد من وجود image_url في البيانات
								slug={prod.id}
							/>
						</div>
					))
				) : (
					<p>لايوجد بيانات</p>
				)}
			</div>
		</div>
	</div>
);

ExploreProductArea.propTypes = {
	className: PropTypes.string,
	space: PropTypes.oneOf([1, 2]),
	data: PropTypes.shape({
		section_title: SectionTitleType,
		products: PropTypes.arrayOf(ProductType),
		placeBid: PropTypes.bool
	}).isRequired
};

ExploreProductArea.defaultProps = {
	space: 1
};

export default ExploreProductArea;
