import PropTypes from 'prop-types';
import clsx from 'clsx';

const CTAArea = ({ space, className, data }) => (
	<div
		className={clsx(
			'rn-callto-action',
			space === 1 && 'rn-section-gapTop',
			className
		)}
	>
		<div className="container-fluid about-fluidimg-cta">
			<div className="row">
				<div className="col-lg-12 position-relative">
					<div className="call-to-action-wrapper">
						<h3
							data-sal="slide-up"
							data-sal-duration="800"
							data-sal-delay="150"
							dangerouslySetInnerHTML={{
								__html: data.app_name
							}}
						/>
						<p
							data-sal="slide-up"
							data-sal-duration="800"
							data-sal-delay="150"
							dangerouslySetInnerHTML={{
								__html: data.about_text
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
);

CTAArea.propTypes = {
	space: PropTypes.oneOf([1, 2]),
	className: PropTypes.string,
	data: PropTypes.shape({
		app_name: PropTypes.string.isRequired, // Added validation for app_name
		about_text: PropTypes.string
	}).isRequired
};

CTAArea.defaultProps = {
	space: 1
};

export default CTAArea;
