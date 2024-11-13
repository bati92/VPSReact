import { useState, useEffect } from 'react';
import Button from '@ui/button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';

const OrderForm = ({ ecard }) => {
	
	const [user, setUser] = useState({});
	
	const storedToken = localStorage.getItem('token');
	useEffect(() => {
		
		const getUserDataAndUpdatePrice = async () => {
			try {
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
				setEcardField((prevFields) => ({
					...prevFields,
					user_id: response.data.id,
						}));
			} catch (error) {
				console.error('Error fetching user data', error);
			}
		};

		getUserDataAndUpdatePrice();
	}, []);
	const [ecardField, setEcardField] = useState({
		mobile: '',
		count: '',
		price: ecard ? ecard.price : '',
		user_id: user ? user.id : '',
		ecard_id: ecard ? ecard.id : ''
	});
	const initialState = {
		mobile: '',
		count: '',
		price: ecard ? ecard.price : '',
		user_id: user ? user.id : '',
		ecard_id: ecard ? ecard.id : ''
	};
	

	

	// حساب السعر تلقائياً عند تغيير `count`
	useEffect(() => {
		const updatedPrice = ecardField.count * ecard.price;
		setEcardField((prevFields) => ({
			...prevFields,
			price: updatedPrice
		}));
	}, [ecardField.count, ecard.price]);

	const onSubmit = async (e) => {
		e.preventDefault();
     if(ecardField.price<=user.balance)
		{const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
		try {
			const result = await axios.post(
				`${apiBaseUrl}/ecard/order/${ecard.id}`,
				ecardField,
				{
					headers: {
						Authorization: `Bearer ${storedToken}`
					}
				}
			);
			
			toast.success(result.data.message);
			setEcardField(initialState);
		} catch (error) {
			if (error.response) {
				console.error('Error Data:', error.response.data);
				console.error('Error Status:', error.response.status);
				console.error('Error Headers:', error.response.headers);
				toast.error("حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مرة أخرى.");
			}
		}
	}
};

	return (
		<div className="form-wrapper-one registration-area">
			<form onSubmit={onSubmit}>
				<div className="tagcloud">
					<h3 className="mb--30">
						اتمام عملية الشراء
						<span className="mybutton-margin">
							السعر: {ecard.price}
						</span>
					</h3>
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
						required
						placeholder="العدد"
						value={ecardField.count}
						onChange={(e) =>
							setEcardField({
								...ecardField,
								count: e.target.value
							})
						}
					/>
					<input
						className="withRadius myinput25 mybutton-margin"
						type="number"
						id="price"
						name="price"
						required
						placeholder="الاجمالي"
						readOnly
						value={ecardField.price}
					/>
				</div>

				<div className="mb-5">
					<label htmlFor="mobile" className="form-label">
						رقم الهاتف
					</label>
					<input
						className="withRadius"
						type="text"
						id="mobile"
						name="mobile"
						required
						placeholder="رقم الهاتف"
						value={ecardField.mobile}
						onChange={(e) =>
							setEcardField({
								...ecardField,
								mobile: e.target.value
							})
						}
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
			<ToastContainer />
		</div>
	);
};

OrderForm.propTypes = {
	ecard: PropTypes.shape({
		price: PropTypes.number.isRequired,
		id: PropTypes.string.isRequired
	}).isRequired,
	user: PropTypes.shape({
		id: PropTypes.string.isRequired
	}).isRequired
};

export default OrderForm;
