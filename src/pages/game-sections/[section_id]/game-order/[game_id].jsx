import PropTypes from 'prop-types';
import clsx from 'clsx';
import ProductTitle from '@components/product-details/myFavorite';
import { getData } from '@utils/getData';
import withAuth from '@components/auth/withAuth';
import OrderForm from '@components/order-form/game';

export async function getServerSideProps(context) {
	const data = await getData(`game/${context.query.game_id}`);
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
						<ProductTitle
							title={myItems?.game?.name}
								item_id={myItems.game.id}
							    item_type="Game"
						/>

						<h6 className="title-name">{myItems?.game?.note}</h6>

						{myItems?.game && <OrderForm game={myItems.game} />}
					</div>
				</div>
			</div>
		</div>
	</div>
);

ProductDetailsArea.propTypes = {
	myItems: PropTypes.shape({
		game: PropTypes.shape({
			name: PropTypes.string.isRequired,
			likeCount: PropTypes.number,
			note: PropTypes.string
		})
	})
};

export default withAuth(ProductDetailsArea);
