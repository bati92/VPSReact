/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@ui/button';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateNewArea = ({ className, space, data }) => {
	const [transferOrderField, setTransferOrderField] = useState({
		transfer_money_firm_id: data ? data.id : '',
		user_id: '',
		sender: '',
		value: 0,
		currency: '',
		decnot_no: '',
		password: '',
		account_salary_name: '',
		account_salary_id: '',
		process_no: ''
	});

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
				setTransferOrderField((prevFields) => ({
					...prevFields,
					user_id: response.data.id
				}));
			} catch (error) {
				console.error('Error fetching user data', error);
			}
		};
		getUserData();
	}, []);

	const handle = (e) => {
		const { name, value } = e.target ? e.target : e;
		setTransferOrderField((prevFields) => ({
			...prevFields,
			[name]: value
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem('token');

		try {
			await axios.post(
				`http://localhost:8000/api/charge`,
				transferOrderField,
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			);
			toast('تم تسجيل طلبك');
		} catch (error) {
			if (error.response) {
				console.log('Error Data:', error.response.data);
				console.log('Error Status:', error.response.status);
				console.log('Error Headers:', error.response.headers);
			}
		}
	};

	return (
		<div
			className={clsx(
				'create-area ',
				space === 1 && 'rn-section-gapTop mysection',
				className
			)}
		>
			<form action="#" name="myform">
				<div className="container">
					<div className="row g-5">
						<div className="mt--100 mt_sm--30 mt_md--30 d-lg-block">
							<div className="col-md-6">
								{[19, 20].includes(data.id) ? (
									<div className="input-box pb--20">
										<p>يرجى تأكيد الراتب الى الحساب :</p>
										<input
											id="iban"
											name="iban"
											disabled
											value={data.iban}
										/>
									</div>
								) : (
									<div className="input-box pb--20">
										<p>
											يرجى إرسال المبلغ إلى هذا الحساب:{' '}
										</p>
										<input
											disabled
											value={data.iban}
											name="iban"
											id="iban"
										/>
									</div>
								)}

								<p className="noteBank">{data.note}</p>
							</div>
						</div>
					</div>
				</div>
			</form>

			<div className="container">
				<div className="row g-5 ">
					<div className="col-lg-3 offset-1 ml_md--0 ml_sm--0 ">
						<div className="upload-area mymargin-top">
							<div className="upload-formate mb--30 ">
								<h6 className="title">هام جداً</h6>
								<p className="formate">
									يرجى ارسال اشعار التحويل.... قبل تعبئة
									الاستمارة
								</p>
							</div>

							<div className="brows-file-wrapper">
								<a href="https://api.whatsapp.com/send?phone=+90 553 406 00 15">
									<i className="feather-upload myicon" />
									<p className="text-center mt--10">
										ارسال الاشعار عبر الواتس اب
									</p>
								</a>
							</div>
						</div>
					</div>

					<div className="col-lg-7">
						<div className="form-wrapper-one">
							<div className="row">
								<form name="form_change">
									<div className="col-md-12">
										{[1, 15, 16, 14].includes(data.id) ? (
											<div className="input-box pb--20">
												<input
													id="sender"
													placeholder="اسم المرسل"
													name="sender"
													onChange={handle}
												/>
											</div>
										) : null}
									</div>

									<div className="col-md-12">
										{[15, 16].includes(data.id) ? (
											<div className="input-box pb--20">
												<input
													id="process_no"
													placeholder="رقم العملية"
													name="process_no"
													onChange={handle}
												/>
											</div>
										) : null}
									</div>

									<div className="col-md-12">
										{[4, 5, 6, 7, 8].includes(data.id) ? (
											<div className="input-box pb--20">
												<input
													id="dekont_no"
													placeholder="لتسهيل عملية التحويل يرجى ادخال رمز الاشعار"
													name="dekont_no"
													onChange={handle}
												/>
											</div>
										) : null}
									</div>

									<div className="col-md-12">
										{[4, 5, 6, 7, 8].includes(data.id) ? (
											<div className="input-box pb--20">
												<input
													id="password"
													placeholder=" لتسهيل عملية السحب يرجى ادخال الرقم السري"
													name="password"
													onChange={handle}
												/>
											</div>
										) : null}
									</div>

									{[19, 20].includes(data.id) && (
										<>
											<div className="col-md-12">
												<div className="input-box pb--20">
													<input
														id="account_salary_id"
														placeholder="ايدي المستخدم"
														name="account_salary_id"
														onChange={handle}
													/>
												</div>
											</div>
											<div className="col-md-12">
												<div className="input-box pb--20">
													<input
														id="account_salary_name"
														placeholder="اسم المستخدم"
														name="account_salary_name"
														onChange={handle}
													/>
												</div>
											</div>
										</>
									)}

									{[
										1, 2, 9, 10, 11, 12, 13, 15, 16, 17, 18,
										19, 20
									].includes(data.id) ? (
										<div className="col-md-12">
											<div className="input-box pb--20">
												<input
													id="value"
													placeholder="القيمة"
													name="value"
													onChange={handle}
												/>
											</div>
										</div>
									) : (
										<div className="col-md-12">
											<div className="input-box pb--20">
												<input
													id="value"
													placeholder="القيمة"
													name="value"
													onChange={handle}
												/>
											</div>
										</div>
									)}

									<div className="col-md-12 col-xl-8 mt_lg--15 mt_md--15 mt_sm--15">
										<div className="input-box">
											<Button
												type="submit"
												id="submit"
												fullwidth
												onClick={onSubmit}
											>
												طلب
											</Button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

CreateNewArea.propTypes = {
	className: PropTypes.string,
	space: PropTypes.oneOf([1]),
	data: PropTypes.shape({
		id: PropTypes.number.isRequired,
		iban: PropTypes.string,
		note: PropTypes.string
	}).isRequired
};

CreateNewArea.defaultProps = {
	space: 1
};

export default CreateNewArea;
