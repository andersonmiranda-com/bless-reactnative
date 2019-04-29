const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAiNBiSHwG1KHYtXKLnW6Cztrjfdsn53wM",
    authDomain: "bless-club.firebaseapp.com",
    databaseURL: "https://bless-club.firebaseio.com",
    projectId: "bless-club",
    storageBucket: "bless-club.appspot.com",
    messagingSenderId: "512322399163"
});

var db = firebase.firestore();

const data = require("./bless-club-export.json");

data &&
    Object.keys(data).forEach(key => {
        const nestedContent = data[key];

        if (typeof nestedContent === "object") {
            Object.keys(nestedContent).forEach(docTitle => {
                db.collection(key)
                    .doc(docTitle)
                    .set(nestedContent[docTitle])
                    .then(res => {
                        console.log("Document successfully written!");
                    })
                    .catch(error => {
                        console.error("Error writing document: ", error);
                    });
            });
        }
    });
