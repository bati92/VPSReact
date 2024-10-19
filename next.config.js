/* eslint-disable no-unused-vars */
const path = require('path');

module.exports = {
	reactStrictMode: false,
	sassOptions: {
		includePaths: [path.join(__dirname, './src/assets/scss')]
	},
	images: {
		domains: ['127.0.0.1', 'localhost'] // Add this line to allow images from localhost
	},
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		// eslint-disable-next-line no-param-reassign
		config.ignoreWarnings = [
			{
				message:
					/(magic-sdk|@walletconnect\/web3-provider|@web3auth\/web3auth)/
			}
		];
		return config;
	}
};
