import firebase from 'firebase'

const config={
    apiKey: "AIzaSyDLxrSA2Udz0nU4lj2GcgN9FLLeEBB_iO0",
    authDomain: "loginreact-f8c1d.firebaseapp.com",
    databaseURL: "https://loginreact-f8c1d.firebaseio.com",
    projectId: "loginreact-f8c1d",
    storageBucket: "loginreact-f8c1d.appspot.com",
    messagingSenderId: "22695121989",
    appId: "1:22695121989:web:b2413d1819e6cf9f"
}

firebase.initializeApp(config);

export default firebase;