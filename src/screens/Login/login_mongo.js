import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Stitch, AnonymousCredential, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUserId: undefined,
            client: undefined
        };
        this._loadClient = this._loadClient.bind(this);
        this._onPressLogin = this._onPressLogin.bind(this);
        this._onPressLogout = this._onPressLogout.bind(this);
    }

    componentDidMount() {
        this._loadClient();
    }

    _loadClient() {
        Stitch.initializeDefaultAppClient("bless-club-nbaqg").then(client => {
            this.setState({ client });
            const db = client
                .getServiceClient(RemoteMongoClient.factory, "bless-club-mongodb")
                .db("bless");
            const usersCollection = db.collection("users");

            usersCollection.findOne({}).then(user => {
                console.log(user.first_name);
            });

            if (client.auth.isLoggedIn) {
                this.setState({ currentUserId: client.auth.user.id });
            }

        });
    }

    _onPressLogin() {
        this.state.client.auth
            .loginWithCredential(new AnonymousCredential())
            .then(user => {
                console.log(`Successfully logged in as user ${user.id}`);
                this.setState({ currentUserId: user.id });
            })
            .catch(err => {
                console.log(`Failed to log in anonymously: ${err}`);
                this.setState({ currentUserId: undefined });
            });
    }

    _onPressLogout() {
        this.state.client.auth
            .logout()
            .then(user => {
                console.log("Successfully logged out");
                this.setState({ currentUserId: undefined });
            })
            .catch(err => {
                console.log(`Failed to log out: ${err}`);
                this.setState({ currentUserId: undefined });
            });
    }

    render() {
        let loginStatus = "Currently logged out.";

        if (this.state.currentUserId) {
            loginStatus = `Currently logged in as ${this.state.currentUserId}!`;
        }

        const loginButton = <Button onPress={this._onPressLogin} title="Login" />;

        const logoutButton = <Button onPress={this._onPressLogout} title="Logout" />;

        return (
            <View style={styles.container}>
                <Text> {loginStatus} </Text>
                {this.state.currentUserId !== undefined ? logoutButton : loginButton}
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
