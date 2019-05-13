import { Facebook } from "expo";
import React, { Component } from "react";
import { StatusBar, Platform } from "react-native";
import { Container, Content, Text, Button, View, Icon, Spinner } from "native-base";
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { saveUser, getUser, setUser } from "../../actions/User";
import {
    Stitch,
    FacebookCredential,
    RemoteMongoClient,
    BSON
} from "mongodb-stitch-react-native-sdk";
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
        this._loadClient();
    }

    _loadClient() {
        let user = this.props.userState;
        Stitch.initializeDefaultAppClient("bless-club-nbaqg").then(mongoClient => {
            this.mongoClient = mongoClient;
            this.db = mongoClient
                .getServiceClient(RemoteMongoClient.factory, "bless-club-mongodb")
                .db("bless");

            // mongoClient.auth.logout();

//            console.log(user._id);

            if (user && user._id !== undefined) {
                this.goHome(user);
            } else {
                if (this.mongoClient.auth.isLoggedIn) {
                    const usersCollection = this.db.collection("users");
                    usersCollection
                        .findOne({ _id: new BSON.ObjectId(mongoClient.auth.user.id) })
                        .then(userData => {
                            //console.log("user data from auth + load", userData);

                            this.setState({ loading: false });
                            this.props.setUser(userData);
                            this.goHome(userData);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    this.setState({ loading: false });
                }
            }
        });
    }

    goHome() {
        this.props.navigation.reset(
            [
                NavigationActions.navigate({
                    routeName: "HomeTabNavigation"
                })
            ],
            0
        );
    }

    authenticate(token, userData) {
        const credential = new FacebookCredential(token);
        Stitch.defaultAppClient.auth
            .loginWithCredential(credential)
            .then(user => {
                this.createUser(user.id, userData);
            })
            .catch(err => {
                this.setState({ loadingFB: false });
                console.log(`Failed to log in Facebook: ${err}`);
            });
    }

    createUser(uid, userData) {
        const uData = {
            first_name: userData.first_name,
            last_name: userData.last_name,
            fbId: userData.id,
            image: `https://graph.facebook.com/${userData.id}/picture?height=500`,
            last_login: new Date()
        };
        const _id = new BSON.ObjectId(uid);

        //le dados do user

        // se não existe, pedir perfil e criar

        //this.goEditProfile();

        //se existe, setUser
        console.log("mandei salvar", _id, uData);
        this.props.saveUser(_id, uData, true);
        this.setState({ loadingFB: false });
        this.goHome();
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
        userState: state.userState
    };
}

export default connect(
    mapStateToProps,
    { saveUser, getUser, setUser }
)(Login);
