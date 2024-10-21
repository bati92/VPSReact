import PropTypes from 'prop-types';
import clsx from 'clsx';
import Logo from '@components/logo';

// Demo data
import footerData from '../../../data/general/footer-02.json';

const Footer = ({ className }) => (
	<div
		className={clsx(
			'rn-footer-area footer-for-left-sticky-header',
			className
		)}
	>
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					<div className="inner text-center">
						<Logo logo={footerData.logo} />
						<p className="description mt--30">
						Copyright © [2024] [ITC] | Designed by [ITC]
						Powered by [ITC]						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
);

Footer.propTypes = {
	className: PropTypes.string
};

export default Footer;
