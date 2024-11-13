import { useState, useEffect } from 'react';
import Button from '@ui/button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';

const OrderForm = ({ ebank }) => {
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
			console.log("uuuu",user);
				
		}
		getUserDataAndUpdatePrice();
	}, []);
	const initialState = {
		count: '',
		price: ebank ? ebank.price : '',
		user_id: user ? user.id : '',
		ebank_id: ebank ? ebank.id : '',
		mobile: ''
	};
	const [ebankField, setEbankField] = useState(initialState);

	useEffect(() => {
		const updatedPrice = ebankField.count * (ebank.price || 0);
		setEbankField((prevFields) => ({
			...prevFields,
			user_id: user ? user.id : '',
			price: updatedPrice
		}));
	}, [ebankField.count, ebank.price]);


	const onSubmit = async (e) => {
		e.preventDefault();

		const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

		const result=await axios.post(`${apiBaseUrl}/ebank/order/${ebank.id}`, ebankField,	{
			headers: {
				Authorization: `Bearer ${storedToken}`
			}
		} 


		);
		toast.success(result.data.message);
		setEbankField(initialState);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEbankField({ ...ebankField, [name]: value });
	};

	return (
		<div className="form-wrapper-one registration-area">
			<form onSubmit={onSubmit}>
				<div className="tagcloud">
					<h3 className="mb--30">اتمام عملية الشراء</h3>
					<p>السعر: {ebank.price}</p>
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
						value={ebankField.count}
						onChange={handleInputChange}
					/>
					<input
						className="withRadius myinput25 mybutton-margin"
						type="number"
						id="price"
						name="price"
						required
						placeholder="الاجمالي"
						readOnly
						value={ebankField.price}
					/>
				</div>

				<div className="mb-5">
					<label htmlFor="mobile" className="form-label">
						رقم الهاتف أو رقم الحساب
					</label>
					<input
						className="withRadius"
						type="text"
						id="mobile"
						name="mobile"
						required
						placeholder="رقم الهاتف أو رقم الحساب"
						value={ebankField.mobile}
						onChange={handleInputChange}
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
			<div>
				<p>{ebank.note}</p>
			</div>
			<ToastContainer />
		</div>
	);
};

// Prop types validation
OrderForm.propTypes = {
	ebank: PropTypes.shape({
		price: PropTypes.number.isRequired,
		id: PropTypes.string.isRequired,
		note: PropTypes.string
	}).isRequired,
	user: PropTypes.shape({
		id: PropTypes.string.isRequired
	}).isRequired
};

export default OrderForm;
