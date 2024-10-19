import PropTypes from 'prop-types';
import clsx from 'clsx';
import Product from '@components/product/layout-01';

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
				{data.length > 0 ? (
					data.map((prod) => (
						<div
							key={prod.id}
							className="col-5 col-lg-4 col-md-6 col-sm-6 col-12"
						>
							<Product
								overlay
								title={prod.name}
								image={prod.image?.url}
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
	data: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			image: PropTypes.shape({
				url: PropTypes.string,
				alt: PropTypes.string
			})
		})
	).isRequired
};

ExploreProductArea.defaultProps = {
	space: 1
};

export default ExploreProductArea;
