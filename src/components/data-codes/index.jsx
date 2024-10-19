import { useState } from 'react';

const Codes = () => {
	const [selectedCode, setSelectedCode] = useState('+90'); // Default value set to +90

	const handleSelectChange = (e) => {
		setSelectedCode(e.target.value);
	};

	return (
		<>
			<select value={selectedCode} onChange={handleSelectChange}>
				<option value="+90">اختر البلد</option>
				<option value="+93">(+93) أفغانستان</option>
				<option value="+355">(+355) ألبانيا</option>
				<option value="+213">(+213) الجزائر</option>
				<option value="+1684">(+1684) ساموا الأمريكية</option>
				<option value="+376">(+376) أندورا</option>
				<option value="+244">(+244) أنغولا</option>
				<option value="+1264">(+1264) أنغويلا</option>
				<option value="+0">(+0) أنتاركتيكا</option>
				<option value="+1268">(+1268) أنتيغوا وبربودا</option>
				<option value="+54">(+54) الأرجنتين</option>
				<option value="+374">(+374) أرمينيا</option>
				<option value="+297">(+297) أروبا</option>
				<option value="+61">(+61) أستراليا</option>
				<option value="+43">(+43) النمسا</option>
				<option value="+994">(+994) أذربيجان</option>
				<option value="+1242">(+1242) جزر البهاما</option>
				<option value="+973">(+973) البحرين</option>
				<option value="+880">(+880) بنغلاديش</option>
				<option value="+1246">(+1246) بربادوس</option>
				<option value="+375">(+375) بيلاروسيا</option>
				<option value="+32">(+32) بلجيكا</option>
				<option value="+501">(+501) بليز</option>
				<option value="+229">(+229) بنين</option>
				<option value="+1441">(+1441) برمودا</option>
				<option value="+975">(+975) بوتان</option>
				<option value="+591">(+591) بوليفيا</option>
				<option value="+387">(+387) البوسنة والهرسك</option>
				<option value="+267">(+267) بوتسوانا</option>
				<option value="+0">(+0) جزيرة بوفيه</option>
				<option value="+55">(+55) البرازيل</option>
				<option value="+246">
					(+246) الإقليم البريطاني في المحيط الهندي
				</option>
				<option value="+673">(+673) بروناي</option>
				<option value="+359">(+359) بلغاريا</option>
				<option value="+226">(+226) بوركينا فاسو</option>
				<option value="+257">(+257) بوروندي</option>
				<option value="+855">(+855) كمبوديا</option>
				<option value="+237">(+237) الكاميرون</option>
				<option value="+1">(+1) كندا</option>
				<option value="+238">(+238) الرأس الأخضر</option>
				<option value="+1345">(+1345) جزر كايمان</option>
				<option value="+236">(+236) جمهورية أفريقيا الوسطى</option>
				<option value="+235">(+235) تشاد</option>
				<option value="+56">(+56) تشيلي</option>
				<option value="+86">(+86) الصين</option>
				<option value="+61">(+61) جزيرة الكريسماس</option>
				<option value="+672">(+672) جزر كوكوس (كيلينغ)</option>
				<option value="+57">(+57) كولومبيا</option>
				<option value="+269">(+269) جزر القمر</option>
				<option value="+242">(+242) الكونغو</option>
				<option value="+242">(+242) جمهورية الكونغو الديمقراطية</option>
				<option value="+682">(+682) جزر كوك</option>
				<option value="+506">(+506) كوستاريكا</option>
				<option value="+225">(+225) كوت ديفوار</option>
				<option value="+385">(+385) كرواتيا</option>
				<option value="+53">(+53) كوبا</option>
				<option value="+357">(+357) قبرص</option>
				<option value="+420">(+420) جمهورية التشيك</option>
				<option value="+45">(+45) الدنمارك</option>
				<option value="+253">(+253) جيبوتي</option>
				<option value="+1767">(+1767) دومينيكا</option>
				<option value="+1809">(+1809) جمهورية الدومينيكان</option>
				<option value="+593">(+593) الإكوادور</option>
				<option value="+20">(+20) مصر</option>
				<option value="+503">(+503) السلفادور</option>
				<option value="+240">(+240) غينيا الاستوائية</option>
				<option value="+291">(+291) إريتريا</option>
				<option value="+372">(+372) إستونيا</option>
				<option value="+251">(+251) إثيوبيا</option>
				<option value="+500">(+500) جزر فوكلاند (مالفيناس)</option>
				<option value="+298">(+298) جزر فارو</option>
				<option value="+679">(+679) فيجي</option>
				<option value="+358">(+358) فنلندا</option>
				<option value="+33">(+33) فرنسا</option>
				<option value="+594">(+594) غويانا الفرنسية</option>
				<option value="+689">(+689) بولينيزيا الفرنسية</option>
				<option value="+0">(+0) الأراضي الفرنسية الجنوبية</option>
				<option value="+241">(+241) الغابون</option>
				<option value="+220">(+220) غامبيا</option>
				<option value="+995">(+995) جورجيا</option>
				<option value="+49">(+49) ألمانيا</option>
				<option value="+233">(+233) غانا</option>
				<option value="+350">(+350) جبل طارق</option>
				<option value="+30">(+30) اليونان</option>
				<option value="+299">(+299) غرينلاند</option>
				<option value="+1473">(+1473) غرينادا</option>
				<option value="+590">(+590) غوادلوب</option>
				<option value="+1671">(+1671) غوام</option>
				<option value="+502">(+502) غواتيمالا</option>
				<option value="+224">(+224) غينيا</option>
				<option value="+245">(+245) غينيا بيساو</option>
				<option value="+592">(+592) غيانا</option>
				<option value="+509">(+509) هايتي</option>
				<option value="+0">(+0) جزيرة هيرد وجزر ماكدونالد</option>
				<option value="+39">(+39) الفاتيكان</option>
				<option value="+504">(+504) هندوراس</option>
				<option value="+852">(+852) هونغ كونغ</option>
				<option value="+36">(+36) المجر</option>
				<option value="+354">(+354) آيسلندا</option>
				<option value="+91">(+91) الهند</option>
				<option value="+62">(+62) إندونيسيا</option>
				<option value="+98">(+98) إيران</option>
				<option value="+964">(+964) العراق</option>
				<option value="+353">(+353) إيرلندا</option>
				<option value="+972">(+972) إسرائيل</option>
				<option value="+39">(+39) إيطاليا</option>
				<option value="+1876">(+1876) جامايكا</option>
				<option value="+81">(+81) اليابان</option>
				<option value="+962">(+962) الأردن</option>
				<option value="+7">(+7) كازاخستان</option>
				<option value="+254">(+254) كينيا</option>
				<option value="+686">(+686) كيريباتي</option>
				<option value="+850">(+850) كوريا الشمالية</option>
				<option value="+82">(+82) كوريا الجنوبية</option>
				<option value="+965">(+965) الكويت</option>
				<option value="+996">(+996) قيرغيزستان</option>
				<option value="+856">(+856) لاوس</option>
				<option value="+371">(+371) لاتفيا</option>
				<option value="+961">(+961) لبنان</option>
				<option value="+266">(+266) ليسوتو</option>
				<option value="+231">(+231) ليبيريا</option>
				<option value="+218">(+218) ليبيا</option>
				<option value="+423">(+423) ليختنشتاين</option>
				<option value="+370">(+370) ليتوانيا</option>
				<option value="+352">(+352) لوكسمبورغ</option>
				<option value="+853">(+853) ماكاو</option>
				<option value="+389">(+389) مقدونيا</option>
				<option value="+261">(+261) مدغشقر</option>
				<option value="+265">(+265) مالاوي</option>
				<option value="+60">(+60) ماليزيا</option>
				<option value="+960">(+960) المالديف</option>
				<option value="+223">(+223) مالي</option>
				<option value="+356">(+356) مالطا</option>
				<option value="+692">(+692) جزر مارشال</option>
				<option value="+596">(+596) مارتينيك</option>
				<option value="+222">(+222) موريتانيا</option>
				<option value="+230">(+230) موريشيوس</option>
				<option value="+269">(+269) مايوت</option>
				<option value="+52">(+52) المكسيك</option>
			</select>
			<p>الرمز المختار: {selectedCode}</p>
		</>
	);
};

export default Codes;
