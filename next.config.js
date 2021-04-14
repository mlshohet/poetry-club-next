const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
	pwa: {
		dest: 'public',
		runtimeCaching,
	},
});

module.exports = {
	future: { webpack5: true }
}

module.exports = {
  images: {
    domains: [
    	'upload.wikimedia.org',
    	'www.emilydickinsonmuseum.org',
    	'www.nydailynews.com',
    	'firebasestorage.googleapis.com'
    ],
  },
}