import firebase from "firebase";

const authenticateWithFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCDFyPk6pnFJHu7diGyC1EwlSA31_QOz8w",
    authDomain: "shopee-clone-19ea7.firebaseapp.com",
    projectId: "shopee-clone-19ea7",
    storageBucket: "shopee-clone-19ea7.appspot.com",
    messagingSenderId: "808288829465",
    appId: "1:808288829465:web:2c41bc555f27694a2fea88",
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

export default authenticateWithFirebase;
