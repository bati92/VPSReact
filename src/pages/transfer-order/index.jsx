import clsx from 'clsx';
import { useState, useEffect } from 'react';
import withAuth from '@components/auth/withAuth';
import OrderForm from '@components/order-form/transfer';
import axios from 'axios';

const ProductDetailsArea = () => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState({});
	const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

	useEffect(() => {
		const token = localStorage.getItem('token');
		const getUserData = async () => {
			axios
				.get(`${apiBaseUrl}/logged-in-user`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then((response) => {
					setUser(response.data);
					setLoading(false);
				})
				.catch(() => {
					setLoading(false);
				});
		};
		getUserData();
	}, [apiBaseUrl]); // Add apiBaseUrl to dependency array

	return loading ? (
		<div>Loading...</div>
	) : (
		<div className={clsx('product-details-area')}>
			<div className="container">
				<div className="row g-5">
					<div className="col-lg-12 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
						<div className="rn-pd-content-area product-style-one mydiv">
							<OrderForm user_id={user.id} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withAuth(ProductDetailsArea);
