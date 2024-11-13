import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import axios from 'axios';

const ProductTitle = ({ className, title, item_id, item_type }) => {
    const [user, setUser] = useState({});
    const [isFavorite, setIsFavorite] = useState(false);
    const storedToken = localStorage.getItem('token');
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.get(
                    `${apiBaseUrl}/logged-in-user`,
                    {
                        headers: {
                            Authorization: `Bearer ${storedToken}`
                        }
                    }
                );
                setUser(response.data);
                checkIfFavorite(); // استدعاء دالة التحقق عند تحميل بيانات المستخدم
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        const checkIfFavorite = async () => {
            try {
              
                const response = await axios.post(
                    `${apiBaseUrl}/is-favorite`,
                    { item_id, item_type },
                    {
                        headers: {
                            Authorization: `Bearer ${storedToken}`
                        }
                    }
                );
                setIsFavorite(response.data.is_favorite);
            } catch (error) {
                console.error("Error checking favorite status:", error);
            }
        };

        getUserData();
    }, [storedToken]);

    const handleAddFavorite = async () => {
        try {
          if(!isFavorite)
           { await axios.post(
                `${apiBaseUrl}/favorites/add`,
                { item_id, item_type },
                {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                }
            );
            setIsFavorite(true);
          }
          else
          { await axios.post(
            `${apiBaseUrl}/favorites/remove`,
            { item_id, item_type },
            {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            }
        );
        setIsFavorite(false);
      }

        } catch (error) {
            console.error("Error adding to favorites:", error);
        }
    };
    return (
      <div className={clsx('pd-title-area', className)}>
          <h4 className="title">{title}</h4>
          <div className="pd-react-area">
              {isFavorite ? (
                  <div className="heart-count favorit" onClick={handleAddFavorite}>
                      <i className="feather-heart " />
                  </div>
              ) : (
                  <div className="heart-count" onClick={handleAddFavorite}>
                      <i className="feather-heart" />
                  </div>
              )}
          </div>
      </div>
  );
  
};

ProductTitle.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    item_id: PropTypes.string.isRequired,
    item_type: PropTypes.string.isRequired
};

export default ProductTitle;
