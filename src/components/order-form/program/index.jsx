import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@ui/button';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const OrderForm = ({ className, program, user }) => {
	const initialState = {
		price: program ? program.price : '',
		user_id: user ? user.id : '',
		program_id: program ? program.id : '',
		count: '0'
	};

	const [programField, setProgramField] = useState(initialState);

	const csrf = () => axios.get('/sanctum/csrf-cookie');

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
			await axios.post(
				`${apiBaseUrl}/program/order/${program.id}`,
				programField,
				csrf
			);
			setProgramField(initialState);
			toast.success('تم تسجيل طلبك');
		} catch (error) {
			if (error.response) {
				// Display user-friendly error message
				toast.error(
					'حدث خطأ أثناء تسجيل طلبك. الرجاء المحاولة مرة أخرى.'
				);
			}
		}
	};

	return (
		<div className={`form-wrapper-one registration-area ${className}`}>
			<form onSubmit={onSubmit}>
				<div className="tagcloud">
					<h3 className="mb--30">
						اتمام عملية الشراء
						<span className="mybutton-margin">
							السعر: {program.price}
						</span>
					</h3>
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
			{program.note && (
				<div>
					<p>{program.note}</p>
				</div>
			)}
			<ToastContainer />
		</div>
	);
};

// Prop types validation
OrderForm.propTypes = {
	className: PropTypes.string,
	program: PropTypes.shape({
		id: PropTypes.string.isRequired,
		price: PropTypes.string.isRequired,
		note: PropTypes.string
	}).isRequired,
	user: PropTypes.shape({
		id: PropTypes.string
	})
};

export default OrderForm;
