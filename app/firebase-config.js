var firebaseConfig = {
  apiKey: "AIzaSyC_WadbSIwsXegV8IB1kcJEJcDd5ttRG3Y",
  authDomain: "car-rental-52d1a.firebaseapp.com",
  projectId: "car-rental-52d1a",
  storageBucket: "car-rental-52d1a.firebasestorage.app",
  messagingSenderId: "1021976168837",
  appId: "1:1021976168837:web:4ca02123f1f61a599c5cec"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var db = firebase.firestore();