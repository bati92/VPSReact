import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@ui/button';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const primaryPrice = 100;

const OrderForm = ({ user }) => {
	const [turkificationOrderField, setTurkificationOrderField] = useState({
		ime: '',
		price: primaryPrice,
		user_id: user ? user.id : ''
	});

	const csrf = () => axios.get('/sanctum/csrf-cookie');

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
			await axios.post(
				`${apiBaseUrl}/turkification/order`,
				turkificationOrderField,
				csrf
			);

			setTurkificationOrderField({
				ime: '',
				price: primaryPrice,
				user_id: user ? user.id : ''
			});
			toast.success('تم تسجيل طلبك');
		} catch (error) {
			if (error.response) {
				// Display user-friendly error message
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
							السعر: {primaryPrice}
						</span>
					</h3>
				</div>

				<div className="mb-5">
					<label htmlFor="ime" className="form-label">
						IME
					</label>
					<input
						className="withRadius"
						type="text"
						id="ime"
						name="ime"
						required
						value={turkificationOrderField.ime}
						placeholder="IME"
						onChange={(e) =>
							setTurkificationOrderField({
								...turkificationOrderField,
								ime: e.target.value
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
