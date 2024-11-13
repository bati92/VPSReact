import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@ui/button';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const primaryPrice = 100;

const OrderForm = () => {

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
	const initialState = {
		mobile: '',
		count: '',
		price: primaryPrice,
		user_id: user ? user.id : ''
	};

	const [transferOrderField, setTransferOrderField] = useState(initialState);

	useEffect(() => {
		const updatedPrice = transferOrderField.count * primaryPrice;
		setTransferOrderField((prevFields) => ({
			...prevFields,
				user_id: user ? user.id : '',
			price: updatedPrice
		}));
	}, [transferOrderField.count]);


	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
		
			const result=	await axios.post(
				`${apiBaseUrl}/transfer/order/`,
				transferOrderField,{
					headers: {
						Authorization: `Bearer ${storedToken}`
					}
				}
			
			);
		
			toast.success(result.data.message);
			setTransferOrderField(initialState);

		} catch (error) {
			if (error.response) {
				toast.error(
					'حدث خطأ أثناء تسجيل طلبك. يرجى المحاولة مرة أخرى.'
				);
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
							السعر: {primaryPrice}tl
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
						value={transferOrderField.count}
						onChange={(e) =>
							setTransferOrderField({
								...transferOrderField,
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
						value={transferOrderField.price}
					/>
				</div>

				<div className="mb-5">
					<label htmlFor="mobile" className="form-label">
						رقم الهاتف المسجل بالموقع
					</label>
					<input
						className="withRadius"
						type="text"
						id="mobile"
						name="mobile"
						required
						value={transferOrderField.mobile}
						placeholder="رقم الهاتف المسجل بالموقع"
						onChange={(e) =>
							setTransferOrderField({
								...transferOrderField,
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
			<br />
			<div>
				<p>هذا المنتج يعمل بشكل يدوي ويستغرق بعض الوقت ليصل للزبون</p>
			</div>
			<ToastContainer />
		</div>
	);
};

// Prop types validation
OrderForm.propTypes = {
	user: PropTypes.shape({
		id: PropTypes.string.isRequired
	})
};

export default OrderForm;
