import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@ui/button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const OrderForm = ({ card }) => {
	
	const initialState = {
		count: 0,
		price: card ? card.price : 0,
		user_id: user ? user.id : '',
		card_id: card ? card.id : ''
	};
	const [orderDetails, setOrderDetails] = useState(initialState);
	const [user, setUser] = useState({});
	
	// الحصول على التوكن من localStorage وتحديث السعر
	const storedToken = localStorage.getItem('token');
useEffect(() => {

	const getUserDataAndUpdatePrice = async () => {
	
			const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
			// جلب بيانات المستخدم
			const response = await axios.get(
				`${apiBaseUrl}/logged-in-user`,
				{
					headers: {
						Authorization: `Bearer ${storedToken}`
					}
				}  
			);
			setUser(response.data);
		
			
	}
	getUserDataAndUpdatePrice();
}, []);
	useEffect(() => {
		// Update price based on count
		const updatedPrice = orderDetails.count * card.price;
		setOrderDetails((prev) => ({ ...prev, 
			user_id: user ? user.id : '',
			price: updatedPrice }));
	}, [orderDetails.count, card.price]);

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
		const result=	await axios.post(
				`${apiBaseUrl}/card/order/${card.id}`,
				orderDetails,{
					headers: {
						Authorization: `Bearer ${storedToken}`
					}
				} 

			);
			toast.success(result.data.message);
			setOrderDetails(initialState); // Reset state on success
		} catch (error) {
			toast.error('فشل في تسجيل الطلب، يرجى المحاولة مرة أخرى');
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setOrderDetails({ ...orderDetails, [name]: value });
	};

	return (
		<div className="form-wrapper-one registration-area">
			<form onSubmit={onSubmit}>
				<div className="tagcloud">
					<h3 className="mb--30">اتمام عملية الشراء</h3>
					<p>السعر: {card.price}</p>
				</div>
				<div className="mb-5">
					<label htmlFor="count" className="form-label">
						العدد
					</label>
					<input
						className="withRadius myinput25"
						type="number"
						id="count"
						name="count"
						placeholder="العدد"
						value={orderDetails.count}
						onChange={handleInputChange}
					/>
					<input
						className="withRadius myinput25 mybutton-margin"
						type="number"
						id="price"
						name="price"
						readOnly
						value={orderDetails.price}
					/>
				</div>

				<Button type="submit" size="medium" className="mr--15">
					شراء
				</Button>
				<Button path="/" color="primary-alta" size="medium">
					الغاء الأمر
				</Button>
			</form>
			<br />
			<br />
			<div>
				<p>{card.note}</p>
			</div>
			<ToastContainer />
		</div>
	);
};

// Prop types validation
OrderForm.propTypes = {
	card: PropTypes.shape({
		price: PropTypes.number.isRequired,
		id: PropTypes.string.isRequired,
		note: PropTypes.string
	}).isRequired,
	user: PropTypes.shape({
		id: PropTypes.string.isRequired
	}).isRequired
};

export default OrderForm;
