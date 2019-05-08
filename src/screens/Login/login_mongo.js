import { Facebook } from "expo";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import {
    Stitch,
    FacebookCredential,
    RemoteMongoClient,
    BSON
} from "mongodb-stitch-react-native-sdk";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: undefined,
            mongoClient: undefined
        };
    }

    componentDidMount() {
        this._loadClient();
    }

    _loadClient() {
        Stitch.initializeDefaultAppClient("bless-club-nbaqg").then(mongoClient => {
            this.setState({ mongoClient });
            if (mongoClient.auth.isLoggedIn) {
                this.setState({ userId: mongoClient.auth.user.id });
            }
        });
    }

    _onPressLogout() {
        this.state.mongoClient.auth
            .logout()
            .then(user => {
                console.log("Successfully logged out");
                this.setState({ userId: undefined });
            })
            .catch(err => {
                console.log(`Failed to log out: ${err}`);
                this.setState({ userId: undefined });
            });
    }

    authenticate(token, userData) {
        const credential = new FacebookCredential(token);
        Stitch.defaultAppClient.auth
            .loginWithCredential(credential)
            .then(user => {
                //this.props.setAppVar("appUser", { ...userData, uid: userInfo.user.uid });
                this.createUser(user.id, userData);
                this.setState({ loadingFB: false, userId: user.id });
            })
            .catch(err => {
                this.setState({ loadingFB: false, userId: null });
                console.log(`Failed to log in Facebook: ${err}`);
            });
    }

    createUser(uid, userData) {
        const db = this.state.mongoClient
            .getServiceClient(RemoteMongoClient.factory, "bless-club-mongodb")
            .db("bless");
        const usersCollection = db.collection("users");
        const uData = {
            first_name: userData.first_name,
            last_name: userData.last_name,
            fbId: userData.id,
            image: `https://graph.facebook.com/${userData.id}/picture?height=500`
        };
        console.log("writing", uid, uData);
        usersCollection
            .updateOne({ _id: new BSON.ObjectId(uid) }, { $set: uData }, { upsert: true })
            .then(result => {
                console.log(result);
            });
    }

    login = async () => {
        this.setState({ loadingFB: true });
        const ADD_ID = "420075655217013";
        const options = {
            permissions: ["public_profile", "email"]
        };
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(ADD_ID, options);

        if (type === "success") {
            const fields = ["id", "first_name", "last_name", "cover", "gender", "birthday", "work"];
            const response = await fetch(
                `https://graph.facebook.com/me?fields=${fields.toString()}&access_token=${token}`
            );
            const userData = await response.json();
            this.authenticate(token, userData);
        } else {
            this.setState({ loadingFB: false });
        }
    };

    render() {
        let loginStatus = "Currently logged out.";

        if (this.state.userId) {
            loginStatus = `Currently logged in as ${this.state.userId}!`;
        }

        const loginButton = <Button onPress={() => this.login()} title="Login" />;

        const logoutButton = <Button onPress={() => this._onPressLogout()} title="Logout" />;

        return (
            <View style={styles.container}>
                <Text> {loginStatus} </Text>
                {this.state.userId !== undefined ? logoutButton : loginButton}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});
