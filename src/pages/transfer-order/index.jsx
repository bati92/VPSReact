import clsx from 'clsx';
import { useState, useEffect } from 'react';
import withAuth from '@components/auth/withAuth';

import OrderForm from '@components/order-form/transfer';


const ProductDetailsArea = () => (

		<div className={clsx('product-details-area')}>
			<div className="container">
				<div className="row g-5">
					<div className="col-lg-12 col-md-12 col-sm-12 mt_md--50 mt_sm--60">
						<div className="rn-pd-content-area product-style-one mydiv">
					
							<OrderForm 
	        
								 />
						</div>
					</div>
				</div>
			</div>
		</div>
	);


export default withAuth(ProductDetailsArea);
