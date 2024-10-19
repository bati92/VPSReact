import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import SectionTitle from '@components/section-title/layout-03';
import ServiceCategory from '@components/service-category';
import { ProductType } from '@utils/types'; // Removed 'flatDeep' as it's unused

// Services sections in the home page
const ExploreServiceCategoryArea = ({
	className,
	space,
	data,
	id,
	sectionTitle
}) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(data?.products);
	}, [data?.products]);

	return (
		<div
			className={clsx(
				'rn-product-area masonary-wrapper-activation',
				space === 1 && 'rn-section-gapTop',
				space === 2 && 'rn-section-gapBottom',
				className
			)}
			id={id}
		>
			<div className="container">
				<div className="row gx-5 align-items-center mb--60">
					<div className="col-lg-4">
						{sectionTitle && (
							<SectionTitle
								className="mb--0"
								disableAnimation
								title={sectionTitle}
							/>
						)}
					</div>
					<div className="col-lg-8" />
				</div>
				<div className="col-lg-12">
					<motion.div layout className="isotope-list item-4">
						{products?.map((prod) => (
							<motion.div
								key={prod.id}
								className={clsx('grid-item')}
								layout
							>
								<ServiceCategory
									id={prod.id}
									title={prod.name}
									slug={data.parentSlug}
									likeCount={prod.id}
									image={prod.image_url}
									authors={prod.authors}
								/>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</div>
	);
};

ExploreServiceCategoryArea.propTypes = {
	className: PropTypes.string,
	space: PropTypes.oneOf([1, 2]),
	id: PropTypes.string,
	sectionTitle: PropTypes.string,
	data: PropTypes.shape({
		parentSlug: PropTypes.string,
		products: PropTypes.arrayOf(ProductType)
	})
};

ExploreServiceCategoryArea.defaultProps = {
	space: 1
};

export default ExploreServiceCategoryArea;
