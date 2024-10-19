import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoadingSpinner from '@components/spinner/index';

// تحويل المكون إلى تعبير وظيفي
const withAuth = (WrappedComponent) => (props) => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [token, setToken] = useState(null);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedToken = localStorage.getItem('token');

			if (!storedToken) {
				router.replace('/login');
			} else {
				setToken(storedToken);
				setLoading(false);
			}
		}
	}, [router]); // إضافة router كمصادفة

	if (loading) return <LoadingSpinner />;

	return <WrappedComponent {...props} token={token} />;
};

export default withAuth;
