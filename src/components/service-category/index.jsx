import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { getData } from '@utils/getData';
import clsx from 'clsx';
import Anchor from '@ui/anchor';
import ProductBid from '@components/product-bid';

const ServiceCategory = ({ overlay, id, title, slug, likeCount, image }) => {
    const [products, setProducts] = useState([]);
    const [unCategorized, setUnCategorized] = useState(false);

    useEffect(() => {
        if (title === "غير مصنف") {
            setUnCategorized(true);
            const fetchData = async () => {
                const data = await getData(`${slug}-sections/${id}`);
               
								setProducts(data.myItems[`${slug}s`]);
               };
            fetchData();
        }
    }, [title, slug, id]);

    return (
        <>
            {unCategorized &&  products.length > 0 ? (
                products.map((product, index) => (
									<motion.div
									key={product.id} 
									className={clsx('grid-item')}
									layout
								>
                    <div key={index} className={clsx('product-style-one', !overlay && 'no-overlay')}>
                        <div className="card-thumbnail">
                            <Anchor path={`/${slug}-sections/${id}/${slug}-order/${product.id}`}>
                                <Image
                                    src={product.image_url}
                                    alt={product.title || title}
                                    width={533}
                                    height={533}
                                />
                            </Anchor>
                        </div>
                        <div className="product-share-wrapper" />
                        <Anchor path={`/${slug}-sections/${product.id}`}>
                            <span className="product-name">{product.name || title}</span>
                        </Anchor>
                     {//  <ProductBid price={product.price || 1} likeCount={product.likeCount || 0} />
 } </div>
										</motion.div>
                ))
            ) : (
							<motion.div
							key={id} 
							className={clsx('grid-item')}
							layout
						>
                <div className={clsx('product-style-one', !overlay && 'no-overlay')}>
                    <div className="card-thumbnail">
                        <Anchor path={`/${slug}-sections/${id}`}>
                            <Image
                                src={image || `/images/services/${slug}.jpg`}
                                alt={title}
                                width={533}
                                height={533}
                            />
                        </Anchor>
                    </div>
                    <div className="product-share-wrapper" />
                    <Anchor path={`/${slug}-sections/${id}`}>
                        <span className="product-name">{title}</span>
                    </Anchor>
                  {
// <ProductBid price={1} likeCount={likeCount} />
               
									}  </div>
								</motion.div>
            )}
        </>
    );
};

ServiceCategory.propTypes = {
    overlay: PropTypes.bool,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    likeCount: PropTypes.number.isRequired,
    image: PropTypes.string,
};

ServiceCategory.defaultProps = {
    overlay: false,
};

export default ServiceCategory;
