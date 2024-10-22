/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import Web3 from 'web3';
import SearchForm from '@components/search-form/layout-03';
import ColorSwitcher from '@components/color-switcher';
import BurgerButton from '@ui/burger-button';
import FlyoutSearchForm from '@components/search-form/layout-02';
import MobileMenu from '@components/menu/mobile-menu-02';
import UserDropdown from '@components/user-dropdown';
import { useOffcanvas, useFlyoutSearch } from '@hooks';
import axios from 'axios';
import sideMenuData from '../../data/general/menu-02.json'; // Corrected import order

const TopBarArea = () => {
	const { search, searchHandler } = useFlyoutSearch();
	const { offcanvas, offcanvasHandler } = useOffcanvas();
	// const { authenticate, isAuthenticated } = useMoralis();

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [ethBalance, setEthBalance] = useState('');
	const [_, setLoading] = useState(true); // Suppressed unused loading variable warning
	const [auth, setAuth] = useState(true);

	useEffect(() => {
		const storedToken = localStorage.getItem('token');

		if (!storedToken) {
			setIsAuthenticated(false);
		} else {
			setIsAuthenticated(true);
			setLoading(false);
		}
		const fetchauth = async () => {
			try {
				const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
				const token = localStorage.getItem('token');

				const result = await axios.get(`${apiBaseUrl}/logged-in-user`, {
					headers: {
						Authorization: `Bearer ${token}` // Pass token in Authorization header
					}
				});
				console.log(result.data);
				setAuth(result.data);
			} catch (error) {
				console.log('Error fetching auth:', error);
			}
		};
		fetchauth();
	}, []);

	const detectCurrentProvider = () => {
		let provider;
		if (window.ethereum) {
			provider = window.ethereum;
		} else if (window.web3) {
			provider = window.web3.currentProvider;
		} else {
			console.log(
				'Non-ethereum browser detected. You should install Metamask'
			);
		}
		return provider;
	};


	const onDisconnect = () => {
		setIsAuthenticated(false);
	};

	return (
		<>
			<div className="rn-top-bar-area">
				<div className="d-none d-lg-block">
					<SearchForm />
				</div>

				<div className="contact-area">
					<div className="rn-icon-list setting-option d-block d-lg-none">
						<div className="icon-box search-mobile-icon">
							<button
								type="button"
								aria-label="Click here to open search form"
								onClick={searchHandler}
							>
								<i className="feather-search" />
							</button>
						</div>
						<FlyoutSearchForm isOpen={search} />
					</div>
					{isAuthenticated && (
						<div className="setting-option rn-icon-list user-account">
							<UserDropdown
								onDisconnect={onDisconnect}
								ethBalance={ethBalance}
								auth={auth}
							/>
						</div>
					)}
					<div className="setting-option mobile-menu-bar ml--5 d-block d-lg-none">
						<div className="hamberger icon-box">
							<BurgerButton onClick={offcanvasHandler} />
						</div>
					</div>
					<div
						id="my_switcher"
						className="my_switcher setting-option"
					>
						<ColorSwitcher />
					</div>
				</div>
			</div>
			<MobileMenu
				menu={sideMenuData}
				isOpen={offcanvas}
				onClick={offcanvasHandler}
				logo={[
					{ src: '/images/logo/logo-white.png' },
					{ src: '/images/logo/logo-dark.png' }
				]}
			/>
		</>
	);
};

export default TopBarArea;
