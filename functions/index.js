const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
let GeoFire = require("geofire");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addMessage = functions.https.onCall((data, context) => {
    return {
        status: "OK",
        MessageBoack: data.text + " recebido!"
    };

    // ...
});

exports.getProfilesFunc = functions.https.onCall((data, context) => {
    //return data;
    const geoFireRef = new GeoFire(admin.database().ref("geoData"));
    const geoQuery = geoFireRef.query({
        center: data.userLocation,
        radius: data.distance //km
    });
    geoQuery.on("key_entered", async (uid, location, distance) => {
        // const user = await admin
        //     .database()
        //     .ref("users")
        //     .child(uid)
        //     .once("value");
        //const filtered = filter(profiles, this.state.user);
        return uid;
    });
});
