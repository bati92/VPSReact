import PropTypes from 'prop-types';
import clsx from 'clsx';
import Image from 'next/image';
import Anchor from '@ui/anchor';

const Activity = ({ className, author, image }) => (
	<div className={clsx('single-activity-wrapper', className)}>
		<div className="inner">
			<div className="read-content">
				{image?.src && (
					<div className="thumbnail">
						<Anchor path="#">
							<Image
								src={image.src} // Use image.src
								alt={image.alt || 'Nft_Profile'} // Dynamic alt
								width={image.width || 500} // Dynamic width
								height={image.height || 500} // Dynamic height
							/>
						</Anchor>
					</div>
				)}
				<div className="content">
					<Anchor path="#">
						<h6 className="title">{author.name}</h6>
					</Anchor>
					<div className="time-maintane">
						<div className="time data">
							<i className="feather-clock" />
							<span>{author.created_at}</span>
						</div>
						<div className="user-area data">
							<i className="feather-user" />
							<Anchor path="#">
								{author.first_name} {author.last_name}
							</Anchor>
						</div>
						<div className="user-area data">
							<i className="feather feather-dollar-sign" />
							<Anchor path="#">1000</Anchor>
						</div>
					</div>
				</div>
			</div>
			<div className="icone-area">
				<i className="feather-plus" />
			</div>
		</div>
	</div>
);

Activity.propTypes = {
	className: PropTypes.string,
	author: PropTypes.shape({
		name: PropTypes.string.isRequired,
		created_at: PropTypes.string.isRequired,
		first_name: PropTypes.string.isRequired,
		last_name: PropTypes.string.isRequired
	}).isRequired,
	image: PropTypes.shape({
		src: PropTypes.string.isRequired,
		alt: PropTypes.string,
		width: PropTypes.number,
		height: PropTypes.number
	}).isRequired
};

export default Activity;
