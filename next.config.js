const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
	pwa: {
		disable: process.env.NODE_ENV === 'development',
		register: true,
		sw: '/sw.js',
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