import PropTypes from 'prop-types';
import clsx from 'clsx';
import ProductTitle from '@components/product-details/title';
import { getData } from '@utils/getData';
import { useEffect } from 'react';
import OrderForm from '@components/order-form/data-comunication';
import withAuth from '@components/auth/withAuth';

export async function getServerSideProps(context) {
	const data = await getData(
		`data-communication/${context.query.data_communication_id}`
	);
	return {
		props: {
			...data
		}
	};
}

const ProductDetailsArea = ({ myItems }) => {
	useEffect(() => {
		const fetchData = async () => {
			try {
				// Uncomment for debugging if needed
				// console.log("Data fetched:", myItems);
			} catch {}
		};

		fetchData();
	}, [myItems]);

	return (
		<div className={clsx('product-details-area')}>
			<div className="container">
				<div className="row g-5">
					<div className="col-lg-12 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
						<div className="rn-pd-content-area product-style-one mydiv">
							<ProductTitle
								title={myItems?.dataCommunication?.name}
								likeCount={
									myItems?.dataCommunication?.likeCount
								}
							/>
							<span className="bid">
								<span className="price" />
							</span>
							{myItems?.dataCommunication && (
								<OrderForm
									dataCommunication={
										myItems.dataCommunication
									}
								/>
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
		dataCommunication: PropTypes.shape({
			name: PropTypes.string.isRequired,
			likeCount: PropTypes.number
		}).isRequired
	}).isRequired
};

export default withAuth(ProductDetailsArea);
