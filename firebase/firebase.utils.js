import firebase from 'firebase/app';

import 'firebase/storage';
import 'firebase/auth';
import 'firebase/analytics';

const firebaseConfig = {
		apiKey: "AIzaSyAe32rw_DCoEU1iA2IkL71lqFn230Shpik",
	    authDomain: "noontide-poetry.firebaseapp.com",
	    projectId: "noontide-poetry",
	    storageBucket: "noontide-poetry.appspot.com",
	    messagingSenderId: "89627946448",
	    appId: "1:89627946448:web:81b2e7b397b3bb1f0e1dd5",
	    measurementId: "G-96LNGQ2XP7"
};

// Initialize Firebase
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const analytics = firebase.analytics;
export const storage = firebase.storage();

export const firebaseAuth = firebase.auth();

export default firebase;
