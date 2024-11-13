import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@ui/button';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from 'axios';

const SignupForm = ({ agent_info, className, myRole, myAgent }) => {
	const [userField, setUserField] = useState({
		name: '',
		first_name: '',
		last_name: '',
		mobile: '',
		code: '',
		agent_id: myAgent,
		role: myRole,
		nationality: '',
		email: '',
		password: '',
		password_confirmation: ''
	});

	const router = useRouter();
	const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

	const changeUserFieldHandler = (e) => {
		const { name, value } = e.target;
		setUserField((prev) => ({
			...prev,
			[name]: value
		}));
	};

	const csrf = () => axios.get('/sanctum/csrf-cookie');

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			await csrf();
			const response = await axios.post(
				`${apiBaseUrl}/register/${agent_info.agent_info}`,
				userField
			);
			if (response.data) {
				localStorage.setItem('token', response.data?.token);
				router.push('/login');
			}
			toast(response.data.message || 'Registration successful');
		} catch {
			toast.error('حدث خطأ أثناء التسجيل. الرجاء المحاولة مرة أخرى.');
		}
	};

	return (
		<div className={clsx('form-wrapper-one', className)}>
			<h4>إنشاء حساب جديد</h4>
			<form>
				<div className="mb-5">
					<label htmlFor="first_name" className="form-label">
						الاسم الأول
					</label>
					<input
						type="text"
						id="first_name"
						name="first_name"
						onChange={changeUserFieldHandler}
					/>
				</div>

				<div className="mb-5">
					<label htmlFor="last_name" className="form-label">
						الكنية
					</label>
					<input
						type="text"
						id="last_name"
						name="last_name"
						onChange={changeUserFieldHandler}
					/>
				</div>

				<div className="mb-5">
					<label htmlFor="name" className="form-label">
						اسم المستخدم
					</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						onChange={changeUserFieldHandler}
					/>
				</div>

				<div className="mb-5  m-label">
					<label htmlFor="mobile" className="form-label">
						رقم الهاتف
					</label>
					<input
						type="text"
						id="mobile"
						name="mobile"
						required
						className="myinput70"
						onChange={changeUserFieldHandler}
					/>
					<select
						required
						className="myinput25 withRadius"
						name="code"
						onChange={changeUserFieldHandler}
					>
						<option value="+90">اختر البلد</option>
						<option value="+93">(+93) أفغانستان</option>
						<option value="+355">(+355) ألبانيا</option>
						<option value="+213">(+213) الجزائر</option>
						{/* Add more country options here */}
					</select>
				</div>

				<div className="mb-5">
					<label htmlFor="email" className="form-label">
						البريد الالكتروني
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						onChange={changeUserFieldHandler}
					/>
				</div>

				<div className="mb-5">
					<label htmlFor="nationality" className="form-label">
						الجنسية
					</label>
					<select
						id="nationality"
						name="nationality"
						required
						onChange={changeUserFieldHandler}
					>
						<option value="">اختر البلد</option>
						<option value="أفغانستان">أفغانستان</option>
						<option value="ألبانيا">ألبانيا</option>
						<option value="الجزائر">الجزائر</option>
						<option value="أندورا">أندورا</option>
						<option value="أنغولا">أنغولا</option>
						<option value="أنغويلا">أنغويلا</option>
						<option value="أنتاركتيكا">أنتاركتيكا</option>
						<option value="الأرجنتين">الأرجنتين</option>
						<option value="أرمينيا">أرمينيا</option>
						<option value="أروبا">أروبا</option>
						<option value="أستراليا">أستراليا</option>
						<option value="النمسا">النمسا</option>
						<option value="أذربيجان">أذربيجان</option>
						<option value="جزر البهاما">جزر البهاما</option>
						<option value="البحرين">البحرين</option>
						<option value="بنغلاديش">بنغلاديش</option>
						<option value="بربادوس">بربادوس</option>
						<option value="بيلاروسيا">بيلاروسيا</option>
						<option value="بلجيكا">بلجيكا</option>
						<option value="بليز">بليز</option>
						<option value="بنين">بنين</option>
						<option value="برمودا">برمودا</option>
						<option value="بوتان">بوتان</option>
						<option value="بوليفيا">بوليفيا</option>
						<option value="البوسنة والهرسك">البوسنة والهرسك</option>
						<option value="بوتسوانا">بوتسوانا</option>
						<option value="البرازيل">البرازيل</option>
						<option value="بروناي">بروناي</option>
						<option value="بلغاريا">بلغاريا</option>
						<option value="بوركينا فاسو">بوركينا فاسو</option>
						<option value="بوروندي">بوروندي</option>
						<option value="كمبوديا">كمبوديا</option>
						<option value="الكاميرون">الكاميرون</option>
						<option value="كندا">كندا</option>
						<option value="الرأس الأخضر">الرأس الأخضر</option>
						<option value="تشاد">تشاد</option>
						<option value="تشيلي">تشيلي</option>
						<option value="الصين">الصين</option>
						<option value="كولومبيا">كولومبيا</option>
						<option value="جزر القمر">جزر القمر</option>
						<option value="الكونغو">الكونغو</option>
						<option value="كوستاريكا">كوستاريكا</option>
						<option value="كوبا">كوبا</option>
						<option value="قبرص">قبرص</option>
						<option value="الدنمارك">الدنمارك</option>
						<option value="جيبوتي">جيبوتي</option>
						<option value="دومينيكا">دومينيكا</option>
						<option value="جمهورية الدومينيكان">
							جمهورية الدومينيكان
						</option>
						<option value="الإكوادور">الإكوادور</option>
						<option value="مصر">مصر</option>
						<option value="السلفادور">السلفادور</option>
						<option value="إستونيا">إستونيا</option>
						<option value="إثيوبيا">إثيوبيا</option>
						<option value="فنلندا">فنلندا</option>
						<option value="فرنسا">فرنسا</option>
						<option value="ألمانيا">ألمانيا</option>
						<option value="غانا">غانا</option>
						<option value="اليونان">اليونان</option>
						<option value="غواتيمالا">غواتيمالا</option>
						<option value="هايتي">هايتي</option>
						<option value="هندوراس">هندوراس</option>
						<option value="هنغاريا">هنغاريا</option>
						<option value="آيسلندا">آيسلندا</option>
						<option value="الهند">الهند</option>
						<option value="إندونيسيا">إندونيسيا</option>
						<option value="إيران">إيران</option>
						<option value="العراق">العراق</option>
						<option value="إيرلندا">إيرلندا</option>
						<option value="سوريا">سوريا</option>
						<option value="إيطاليا">إيطاليا</option>
						<option value="جامايكا">جامايكا</option>
						<option value="اليابان">اليابان</option>
						<option value="الأردن">الأردن</option>
						<option value="كينيا">كينيا</option>
						<option value="الكويت">الكويت</option>
						<option value="لبنان">لبنان</option>
						<option value="ليبيا">ليبيا</option>
						<option value="لوكسمبورغ">لوكسمبورغ</option>
						<option value="ماليزيا">ماليزيا</option>
						<option value="المكسيك">المكسيك</option>
						<option value="المغرب">المغرب</option>
						<option value="هولندا">هولندا</option>
						<option value="نيوزيلندا">نيوزيلندا</option>
						<option value="نيجيريا">نيجيريا</option>
						<option value="النرويج">النرويج</option>
						<option value="عمان">عمان</option>
						<option value="باكستان">باكستان</option>
						<option value="فلسطين">فلسطين</option>
						<option value="بنما">بنما</option>
						<option value="بيرو">بيرو</option>
						<option value="الفلبين">الفلبين</option>
						<option value="بولندا">بولندا</option>
						<option value="البرتغال">البرتغال</option>
						<option value="قطر">قطر</option>
						<option value="روسيا">روسيا</option>
						<option value="السعودية">السعودية</option>
						<option value="سنغافورة">سنغافورة</option>
						<option value="جنوب أفريقيا">جنوب أفريقيا</option>
						<option value="إسبانيا">إسبانيا</option>
					</select>
				</div>

				<div className="mb-5">
					<label htmlFor="password" className="form-label">
						كلمة المرور
					</label>
					<input
						type="password"
						id="password"
						name="password"
						required
						onChange={changeUserFieldHandler}
					/>
				</div>

				<div className="mb-5">
					<label
						htmlFor="password_confirmation"
						className="form-label"
					>
						تأكيد كلمة المرور
					</label>
					<input
						type="password"
						id="password_confirmation"
						name="password_confirmation"
						required
						onChange={changeUserFieldHandler}
					/>
				</div>

				<Button
					type="submit"
					size="medium"
					onClick={onSubmit}
					className="mr--15"
				>
					حفظ
				</Button>
				<Button path="/login" color="primary-alta" size="medium">
					تسجيل دخول
				</Button>
			</form>
		</div>
	);
};

SignupForm.propTypes = {
	className: PropTypes.string,
	agent_info: PropTypes.object.isRequired,
	myRole: PropTypes.string.isRequired,
	myAgent: PropTypes.string.isRequired
};

export default SignupForm;
