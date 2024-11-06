import { useState } from 'react'; // Import only necessary React module
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@ui/button';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';

const LoginForm = ({ className }) => {
	const router = useRouter();
	const [userField, setUserField] = useState({
		email: '',
		password: ''
	});

	const changeUserFieldHandler = (e) => {
		const { name, value } = e.target;
		setUserField((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
			const { data } = await axios.post(`${apiBaseUrl}/login`, userField);
			if (data?.token) {
				localStorage.setItem('token', data.token);
				router.push('/');
				toast.success('Login successful!');
			} else {
				toast.error(data.message || 'المستخدم غير موجود');
			}
		} catch (error) {
			if (error.response) {
				console.error('Error fetching slider:', {
                message: error.message,
                code: error.code,
                config: error.config,
                response: error.response ? {
                    status: error.response.status,
                    data: error.response.data,
                    headers: error.response.headers
                } : 'No response received'
            });
			} else {
				toast.error('Something went wrong. Please try again later.');
			}
		}
	};

	return (
		<div className={clsx('form-wrapper-one product-style-one', className)}>
			<h4 className="mycenter">تسجيل الدخول</h4>
			<form onSubmit={onSubmit}>
				<div className="mb-5">
					<label htmlFor="email" className="form-label">
						البريد الالكتروني
					</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="البريد الالكتروني"
						required
						autoComplete="username"
						className="withRadius"
						onChange={changeUserFieldHandler}
					/>
				</div>

				<div className="mb-5">
					<label htmlFor="password" className="form-label">
						كلمة المرور
					</label>
					<input
						type="password"
						id="password"
						name="password"
						placeholder="كلمة المرور"
						required
						autoComplete="current-password"
						className="withRadius"
						onChange={changeUserFieldHandler}
					/>
				</div>
				<Button type="submit" size="medium" className="mr--15">
					تسجيل الدخول
				</Button>
				<Button path="/sign-up" color="primary-alta" size="medium">
					انشاء حساب جديد
				</Button>
			</form>
		</div>
	);
};

LoginForm.propTypes = {
	className: PropTypes.string
};

export default LoginForm;
