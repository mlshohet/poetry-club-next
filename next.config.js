const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
	pwa: {
		dest: 'public',
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