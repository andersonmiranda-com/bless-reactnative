import { Facebook } from "expo";
import React, { Component } from "react";
import { StatusBar, Platform } from "react-native";
import { Container, Content, Text, Button, View, Icon, Spinner } from "native-base";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { setAppVar } from "../../actions/index";
import firebase from "firebase";
import styles from "./styles";
import AppIntro from "./AppIntro";
import commonColor from "../../theme/variables/commonColor";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingFB: false
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(auth => {
            if (auth) {
                this.firebaseRef = firebase.database().ref("users");
                this.firebaseRef.child(auth.uid).on("value", snap => {
                    const user = snap.val();
                    this.setState({ loading: false });
                    if (user != null) {
                        this.firebaseRef.child(auth.uid).off("value");
                        this.goHome(user);
                    }
                });
            } else {
                this.setState({ loading: false });
            }
        });
    }

    checkUser = async () => {
        const { appUser } = this.props.appState;
        console.log(appUser);
        if (appUser.uid) {
            this.setState({ loading: false, loadingFB: false });
            console.log("entrou");

            this.props.navigation.reset(
                [
                    NavigationActions.navigate({
                        routeName: "HomeTabNavigation",
                        params: { user: appUser }
                    })
                ],
                0
            );
        } else {
            this.setState({ loading: false, loadingFB: false });
        }
    };

    goHome(user) {
        this.props.navigation.reset(
            [
                NavigationActions.navigate({
                    routeName: "HomeTabNavigation",
                    params: { user: user }
                })
            ],
            0
        );
    }

    authenticate = token => {
        const provider = firebase.auth.FacebookAuthProvider;
        const credential = provider.credential(token);
        return firebase.auth().signInAndRetrieveDataWithCredential(credential);
    };

    createUser = (uid, userData) => {
        var usersRef = firebase.firestore().collection("users");
        usersRef.doc(uid).set({ ...userData, uid });

        firebase
            .database()
            .ref("users")
            .child(uid)
            .update({ ...userData, uid });
    };

    login = async () => {
        this.setState({ loadingFB: true });
        const ADD_ID = "420075655217013";
        const options = {
            permissions: ["public_profile", "email"]
        };
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(ADD_ID, options);

        if (type === "success") {
            const fields = ["id", "first_name", "last_name", "gender", "birthday", "work"];
            const response = await fetch(
                `https://graph.facebook.com/me?fields=${fields.toString()}&access_token=${token}`
            );
            const userData = await response.json();
            const userInfo = await this.authenticate(token);

            //this.props.setAppVar("appUser", { ...userData, uid: userInfo.user.uid });
            this.createUser(userInfo.user.uid, userData);
            //this.checkUser();
            this.setState({ loadingFB: false });
        } else {
            this.setState({ loadingFB: false });
        }
    };

    render() {
        let { loading, loadingFB } = this.state;
        return (
            <Container style={{ backgroundColor: "#fff" }}>
                <StatusBar
                    backgroundColor={
                        Platform.OS === "android" ? commonColor.statusBarColor : "transparent"
                    }
                    barStyle="dark-content"
                />

                {loading && (
                    <View style={styles.wrapperCentered}>
                        <Spinner />
                    </View>
                )}

                {!loading && (
                    <Content scrollEnabled={false}>
                        <View>
                            <AppIntro />
                            <Button
                                block
                                rounded
                                style={styles.loginFBBtn}
                                //onPress={() => this.props.navigation.navigate("HomeTabNavigation")}
                                onPress={this.login}
                            >
                                {!loadingFB ? (
                                    <Icon
                                        name="facebook-official"
                                        type="FontAwesome"
                                        style={{ fontSize: 20, marginRight: 8 }}
                                    />
                                ) : (
                                    <Spinner
                                        size="small"
                                        color="white"
                                        style={{ marginRight: 8 }}
                                    />
                                )}
                                <Text style={styles.loginBtnText}>Log in with Facebook</Text>
                            </Button>
                            <Button
                                block
                                rounded
                                style={styles.loginBtn}
                                onPress={() => this.props.navigation.navigate("HomeTabNavigation")}
                            >
                                <Text style={styles.loginBtnText}>Login with email</Text>
                            </Button>
                        </View>
                    </Content>
                )}

                {!loading && (
                    <View style={styles.noteView}>
                        <Text style={styles.noteText}>
                            By signing in, you agree with our terms of services and privacy settings
                        </Text>
                    </View>
                )}
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        appState: state.appState
    };
}

export default connect(
    mapStateToProps,
    { setAppVar }
)(Login);
