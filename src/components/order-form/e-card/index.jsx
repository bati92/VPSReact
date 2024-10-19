import { useState, useEffect } from 'react';
import Button from '@ui/button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';

const OrdeForm = ({ ecard, user }) => {
	const [ecardField, setEcardField] = useState({
		mobile: '',
		count: '',
		price: ecard ? ecard.price : '',
		user_id: user ? user.id : '',
		ecard_id: ecard ? ecard.id : ''
	});

	useEffect(() => {
		const updatedPrice = ecardField.count * ecard.price;
		setEcardField((prevFields) => ({
			...prevFields,
			price: updatedPrice
		}));
	}, [ecardField.count, ecard.price]);

	const csrf = () => axios.get('/sanctum/csrf-cookie');

	const onSubmit = async (e) => {
		e.preventDefault();

		const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
		await axios.post(
			`${apiBaseUrl}/ecard/order/${ecard.id}`,
			ecardField,
			csrf
		);
		toast('تم تسجيل طلبك');
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

OrdeForm.propTypes = {
	ecard: PropTypes.shape({
		price: PropTypes.number.isRequired,
		id: PropTypes.string.isRequired
	}).isRequired,
	user: PropTypes.shape({
		id: PropTypes.string.isRequired
	}).isRequired
};

export default OrdeForm;
