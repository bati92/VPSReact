import PropTypes from 'prop-types';
import Image from 'next/image';
import Anchor from '@ui/anchor';
import LogoutButton from '@components/logout-button';

const UserDropdown = ({ ethBalance, auth }) => (
	<div className="icon-box">
		<Anchor path="/">
			<Image
				src="/images/icons/boy-avater.png"
				alt="Images"
				width={38}
				height={38}
			/>
		</Anchor>
		<div className="rn-dropdown">
			<div className="rn-inner-top">
				<h4 className="title">
					<Anchor path="#">
						{auth.first_name} {auth.last_name}
					</Anchor>
				</h4>
				<span>
					<Anchor path="#">{auth.name}</Anchor>
				</span>
			</div>
			<div className="rn-product-inner">
				<ul className="product-list">
					<li className="single-product-list">
						<div className="thumbnail">
							<Anchor path="#">
								<Image
									src="/images/portfolio/portfolio-07.jpg"
									alt="Nft Product Images"
									width={50}
									height={50}
								/>
							</Anchor>
						</div>
						<div className="content">
							<h6 className="title">
								<Anchor path="#">الرصيد</Anchor>
							</h6>
							<span className="price">TL {auth.balance} </span>
						</div>
						<div className="button" />
					</li>
				</ul>
			</div>
			<div className="add-fund-button mt--20 pb--20">
				<Anchor className="btn btn-primary-alta w-100" path="#">
					دعوة عملاء
				</Anchor>
			</div>
			<ul className="list-inner">
				<li>
					<Anchor path="/edit-profile">المعلومات الشخصية</Anchor>
				</li>

				<li>
					<LogoutButton />
				</li>
			</ul>
		</div>
	</div>
);

UserDropdown.propTypes = {
	ethBalance: PropTypes.string,
	auth: PropTypes.shape({
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		name: PropTypes.string
	})
};

export default UserDropdown;
