import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Image from 'next/image';
import clsx from 'clsx';
import Anchor from '@ui/anchor';
import ClientAvatar from '@ui/client-avatar';
import ProductBid from '@components/product-bid';
import { ImageType } from '@utils/types';

// Dynamically import components only when necessary, without server-side rendering
const ShareDropdown = dynamic(() => import('@components/share-dropdown'), {
	ssr: false
});

// Single service in home page example in /home page
// Thumbnail - pictures above - service name - number of sections - stars + heart
const Service = ({
	overlay,
	title,
	slug,
	total,
	price,
	likeCount,
	image,
	authors,
	hasSections,
	directToOrder,
	disableShareDropdown
}) => {
	const [servicePath, setServicePath] = useState(`/${slug}s`);

	useEffect(() => {
		let path = `/${slug}s`;
		if (hasSections) {
			path = `/${slug}-sections`;
		} else if (directToOrder) {
			path = `/${slug}-order`;
		}
		setServicePath(path);
	}, [hasSections, directToOrder, slug]);

	return (
		<div className={clsx('product-style-one', !overlay && 'no-overlay')}>
			<div className="card-thumbnail">
				<Anchor path={servicePath}>
					<Image
						src={image}
						alt={image?.alt || 'NFT_portfolio'}
						width={533}
						height={533}
					/>
				</Anchor>
			</div>
			<div className="product-share-wrapper">
				<div className="profile-share">
					{authors?.map((client) => (
						<ClientAvatar
							key={client.name}
							slug={client.slug}
							name={client.name}
							image=""
						/>
					))}
				</div>
				{//!disableShareDropdown && <ShareDropdown />
				}
			</div>
			<Anchor path={servicePath}>
				<span className="product-name">{title}</span>
			</Anchor>
		{//	<span className="latest-bid">{`عدد ${title}: ${total}`}</span>
			//<ProductBid price={price} likeCount={likeCount} />
			}
		</div>
	);
};

Service.propTypes = {
	overlay: PropTypes.bool,
	hasSections: PropTypes.bool,
	directToOrder: PropTypes.bool,
	title: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
	total: PropTypes.number.isRequired,
	price: PropTypes.number.isRequired, // Added missing validation
	likeCount: PropTypes.number.isRequired,
	image: ImageType.isRequired,
	authors: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			slug: PropTypes.string.isRequired,
			image: ImageType.isRequired
		})
	),
	disableShareDropdown: PropTypes.bool // Added missing validation
};

Service.defaultProps = {
	overlay: false
};

export default Service;
