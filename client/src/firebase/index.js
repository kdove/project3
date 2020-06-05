import firebase from 'firebase/app';
import 'firebase/storage';


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCdE0o4Zm3AslHcqPbx4sJHVPh6CLm1_y4",
    authDomain: "react-project-1cc5a.firebaseapp.com",
    databaseURL: "https://react-project-1cc5a.firebaseio.com",
    projectId: "react-project-1cc5a",
    storageBucket: "react-project-1cc5a.appspot.com",
    messagingSenderId: "553827008143",
    appId: "1:553827008143:web:a279efa9e2d2a590f6fafa",
    measurementId: "G-PRGVX3YH31"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage,
    firebase as
    default
}