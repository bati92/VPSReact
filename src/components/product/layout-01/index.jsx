import PropTypes from 'prop-types';
import Image from 'next/image';
import clsx from 'clsx';
import Anchor from '@ui/anchor';
import ProductBid from '@components/product-bid';
import ShareDropdown from '@components/share-dropdown'; // Only import what's needed

const Product = ({
	overlay,
	title,
	slug,
	note,
	status,
	section,
	price,
	likeCount,
	disableShareDropdown
}) => (
	<div className={clsx('product-style-one', !overlay && 'no-overlay')}>
		<div className="card-thumbnail">
			<Anchor path={`/app/${slug}`}>
				<Image
					src="https://static.semrush.com/blog/uploads/media/39/4f/394f92fd06792246f5833d1ab3c05c4d/reverse-image-search.svg"
					alt={title}
					width={533}
					height={533}
				/>
			</Anchor>
		</div>
		<div className="product-share-wrapper">
			<div className="profile-share">
				<span className="latest-bid">
					القسم:{' '}
					<Anchor className="more-author-text" path={`/app/${slug}`}>
						{section}
					</Anchor>
				</span>
			</div>
			<div className="profile-share">
				<span className="latest-bid">
					الحالة:{' '}
					<Anchor className="more-author-text" path={`/app/${slug}`}>
						{status ? 'فعال' : 'غير فعال'}
					</Anchor>
				</span>
			</div>
			{!disableShareDropdown && <ShareDropdown />}
		</div>
		<Anchor path={`/app/${slug}`}>
			<span className="product-name">{title}</span>
		</Anchor>
		<span className="latest-bid">السعر: {price?.amount}</span>
		<br />
		<span className="latest-bid">ملاحظة: {note}</span>
		<ProductBid price={note} likeCount={likeCount} />
	</div>
);

Product.propTypes = {
	overlay: PropTypes.bool,
	title: PropTypes.string.isRequired,
	slug: PropTypes.number.isRequired,
	note: PropTypes.string,
	status: PropTypes.number,
	section: PropTypes.number.isRequired,
	price: PropTypes.shape({
		amount: PropTypes.number.isRequired,
		currency: PropTypes.string.isRequired
	}).isRequired,
	likeCount: PropTypes.number.isRequired,
	disableShareDropdown: PropTypes.bool
};

Product.defaultProps = {
	overlay: false
};

export default Product;
