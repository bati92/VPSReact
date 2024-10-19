import { useState, useEffect } from 'react';
import Button from '@ui/button';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';

const OrderForm = ({ app }) => {
	const [user, setUser] = useState({});
	const initialState = {
		count: '',
		price: app ? app.price : '',
		user_id: user ? user.id : '',
		app_id: app ? app.id : ''
	};
	const [appField, setAppField] = useState(initialState);

	useEffect(() => {
		const token = localStorage.getItem('token');
		const getUserData = async () => {
			try {
				const response = await axios.get(
					'http://127.0.0.1:8000/api/logged-in-user',
					{
						headers: {
							Authorization: `Bearer ${token}`
						}
					}
				);
				setUser(response.data);
				setAppField((prevFields) => ({
					...prevFields,
					user_id: response.data.id
				}));
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error('Error fetching user data', error);
			}
		};
		getUserData();
	}, []);

	useEffect(() => {
		const updatedPrice = appField.count * app.price;
		setAppField((prevFields) => ({
			...prevFields,
			price: updatedPrice
		}));
	}, [appField.count, app.price]);

	const onSubmit = async (e) => {
		e.preventDefault();
		const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
		try {
			await axios.post(`${apiBaseUrl}/app/order/${app.id}`, appField);
			toast('تم تسجيل طلبك');
			setAppField(initialState);
		} catch (error) {
			if (error.response) {
				// eslint-disable-next-line no-console
				console.error('Error Data:', error.response.data);
				// eslint-disable-next-line no-console
				console.error('Error Status:', error.response.status);
				// eslint-disable-next-line no-console
				console.error('Error Headers:', error.response.headers);
			}
		}
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setAppField({ ...appField, [name]: value });
	};

	return (
		<div className="form-wrapper-one registration-area">
			<form onSubmit={onSubmit}>
				<div className="tagcloud">
					<h3 className="mb--30">
						اتمام عملية الشراء <span> السعر : {app.price}</span>
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
						value={appField.count}
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
						value={appField.price}
					/>
				</div>

				<div className="mb-5">
					<label htmlFor="player_no" className="form-label">
						معرف اللاعب
					</label>
					<input
						className="withRadius"
						type="text"
						id="player_no"
						name="player_no"
						required
						value={appField.player_no || ''}
						placeholder="معرف اللاعب"
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
			<br />
			<div>
				<p>{app.note}</p>
			</div>
			<ToastContainer />
		</div>
	);
};

OrderForm.propTypes = {
	app: PropTypes.shape({
		price: PropTypes.number.isRequired,
		id: PropTypes.string.isRequired,
		note: PropTypes.string
	}).isRequired
};

export default OrderForm;
