import PropTypes from 'prop-types';
import clsx from 'clsx';
import ProductTitle from '@components/product-details/myFavorite';
import { getData } from '@utils/getData';
import withAuth from '@components/auth/withAuth';
import OrderForm from '@components/order-form/e-card';

export async function getServerSideProps(context) {
	const data = await getData(`ecard/${context.query.ecard_id}`);
	return {
		props: {
			...data
		}
	};
}

const ProductDetailsArea = ({ myItems }) => (
	<div className={clsx('product-details-area')}>
		<div className="container">
			<div className="row g-5">
				<div className="col-lg-12 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
					<div className="rn-pd-content-area product-style-one mydiv">
						{myItems?.ecard && (
							<>
								<ProductTitle
									title={myItems.ecard.name}
								item_id={myItems.ecard.id}
							    item_type="ecards"
								/>
								<OrderForm ecard={myItems.ecard} />
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	</div>
);

ProductDetailsArea.propTypes = {
	myItems: PropTypes.shape({
		ecard: PropTypes.shape({
			name: PropTypes.string.isRequired,
			likeCount: PropTypes.number.isRequired
		})
	}).isRequired
};

export default withAuth(ProductDetailsArea);
