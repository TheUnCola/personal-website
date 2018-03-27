/*
global firebase
*/
// Initialize Firebase
var config = {
    apiKey: "AIzaSyC54xda7jdk5hFXF1Q7dVAOFr9eyZOKW8Q",
    authDomain: "website-837af.firebaseapp.com",
    databaseURL: "https://website-837af.firebaseio.com",
    projectId: "website-837af",
    storageBucket: "website-837af.appspot.com",
    messagingSenderId: "331932157491"
  };
  firebase.initializeApp(config);

var db = firebase.database();