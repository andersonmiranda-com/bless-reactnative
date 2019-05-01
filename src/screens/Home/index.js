import Expo from "expo";
import React, { Component } from "react";
import PhotoCards from "../PhotoCards";
import * as firebase from "firebase";
//import "firebase/firestore";
import { GeoFire } from "geofire";

class Home extends Component {
    //db = firebase.firestore();

    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            loading: true
        };
    }

    componentDidMount() {
        this.updateUserLocation(this.props.navigation.state.params.uid);

        /*   var usersRef = this.db.collection("users");
        usersRef.get().then(querySnapshot => {
            let profiles = [];
            querySnapshot.forEach(doc => {
                const { name, bio, birthday, id } = doc.data();
                profiles.push({ name, bio, birthday, id });
            });
            this.setState({ profiles, loading: false });
        }); */

        firebase
            .database()
            .ref()
            .child("users")
            .once("value", snap => {
                let profiles = [];
                snap.forEach(profile => {
                    const { first_name, bio, birthday, id } = profile.val();
                    profiles.push({ first_name, bio, birthday, id });
                });
                this.setState({ profiles, loading: false  });
            });
    }

    updateUserLocation = async uid => {
        const { Permissions, Location } = Expo;
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === "granted") {
            const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: false });
            const { latitude, longitude } = location.coords;
            const geoFireRef = new GeoFire(firebase.database().ref("geoData"));
            geoFireRef.set(uid, [latitude, longitude]);

            console.log("Permission Granted", location);
        } else {
            console.log("Permission Denied");
        }
    };

    render() {
        const { profiles, loading } = this.state;
        return (
            <PhotoCards profiles={profiles} loading={loading} navigation={this.props.navigation} />
        );
    }
}

export default Home;
