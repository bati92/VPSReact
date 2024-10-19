import clsx from 'clsx';
import OrderForm from '@components/order-form/turkification';
import { getData } from '@utils/getData';
import withAuth from '@components/auth/withAuth';

export async function getServerSideProps(context) {
	const data = await getData(
		`transfer-money-firm/${context.query.transfer_money_firm_id}`
	);
	return {
		props: {
			...data
		}
	};
}

const ProductDetailsArea = () => (
	<div className={clsx('product-details-area')}>
		<div className="container">
			<div className="row g-5">
				<div className="col-lg-5 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
					<div className="rn-pd-content-area">
						<OrderForm />
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default withAuth(ProductDetailsArea);
