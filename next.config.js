const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

const prod = process.env.NODE_ENV === 'production';

module.exports = withPWA({
	pwa: {
		disable: prod ? false : true,
		dest: 'public',
		register: true,
		runtimeCaching,
	},
	future: { 
		webpack5: true,
	},
	images: {
	    domains: [
	    	'firebasestorage.googleapis.com'
	    ],
	  },
});