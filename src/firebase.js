import firebase from "firebase";

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyDmDey5vHNRSUT9KKX9yo8ugOlPj6C3bRE",
    authDomain: "todolist-e7e85.firebaseapp.com",
    databaseURL: "https://todolist-e7e85.firebaseio.com",
    projectId: "todolist-e7e85",
    storageBucket: "todolist-e7e85.appspot.com",
    messagingSenderId: "708779221839",
    appId: "1:708779221839:web:774d4edc9846d23c791b3a"
};
  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();
