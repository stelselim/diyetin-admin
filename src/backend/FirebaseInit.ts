import firebase from 'firebase';

export const FirebaseInit = () => {
    let firebaseConfig = {
        apiKey: 'AIzaSyBn4BzBjPoDRiRD0zOAA56Ge0pONpQ6d6c',
        authDomain: 'beslenmeblog-c313a.firebaseapp.com',
        databaseURL: 'https://beslenmeblog-c313a.firebaseio.com',
        projectId: 'beslenmeblog-c313a',
        storageBucket: 'beslenmeblog-c313a.appspot.com',
        messagingSenderId: '1042722828462',
        appId: '1:1042722828462:web:aa5fc3f5539343c1c47d3f',
        measurementId: 'G-LMXB8WYNJD',
    };
    // Initialize Firebase
    return {
        firebase: firebase.initializeApp(firebaseConfig),
        analytics: firebase.analytics(),
    };
};
