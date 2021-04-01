// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export function firebaseInit() {
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
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();
};