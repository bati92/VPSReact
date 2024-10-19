import PropTypes from 'prop-types';
import Image from 'next/image';
import clsx from 'clsx';
import Anchor from '@ui/anchor';
import ProductBid from '@components/product-bid';

// قسم الترجمة في صفحة التطبيقات
// التطبيقات/قسم الترجمة
const ServiceCategory = ({ overlay, id, title, slug, likeCount, image }) => (
	<div className={clsx('product-style-one', !overlay && 'no-overlay')}>
		<div className="card-thumbnail">
			<Anchor path={`/${slug}-sections/${id}`}>
				<Image
					src={image || `/images/services/${slug}.jpg`}
					alt={title}
					width={533}
					height={533}
				/>
			</Anchor>
		</div>
		<div className="product-share-wrapper" />
		<Anchor path={`/${slug}-sections/${id}`}>
			<span className="product-name">{title}</span>
		</Anchor>
		<ProductBid price={1} likeCount={likeCount} />
	</div>
);

ServiceCategory.propTypes = {
	overlay: PropTypes.bool,
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired, // Changed to string
	likeCount: PropTypes.number.isRequired,
	image: PropTypes.string
};

ServiceCategory.defaultProps = {
	overlay: false
};

export default ServiceCategory;
