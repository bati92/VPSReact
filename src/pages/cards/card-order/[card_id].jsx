import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'axios';
import ProductTitle from '@components/product-details/title';
import { getData } from '@utils/getData';
import { useEffect, useState } from 'react';
import withAuth from '@components/auth/withAuth';
import OrderForm from '@components/order-form/card';

export async function getServerSideProps(context) {
	const data = await getData(`card/${context.query.card_id}`);
	return {
		props: {
			...data
		}
	};
}

const ProductDetailsArea = ({ myItems }) => {
	const [user, setUser] = useState({});

	const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

	useEffect(() => {
		const token = localStorage.getItem('token');
		const getUserData = async () => {
			const response = await axios.get(`${apiBaseUrl}/logged-in-user`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			setUser(response.data);
		};
		getUserData();
	}, [apiBaseUrl]);

	return (
		<div className={clsx('product-details-area')}>
			<div className="container">
				<div className="row g-5">
					<div className="col-lg-12 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
						<div className="rn-pd-content-area product-style-one mydiv">
							{myItems?.card && (
								<>
									<ProductTitle
										title={myItems.card.name}
										likeCount={myItems.card.likeCount}
									/>
									<span className="bid" />
									<OrderForm
										card={myItems.card}
										user_id={user.id}
									/>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

ProductDetailsArea.propTypes = {
	myItems: PropTypes.shape({
		card: PropTypes.shape({
			name: PropTypes.string.isRequired,
			likeCount: PropTypes.number
		})
	}).isRequired
};

export default withAuth(ProductDetailsArea);
