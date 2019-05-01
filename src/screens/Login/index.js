import Expo from "expo";
import React, { Component } from "react";
import { Dimensions, Image, StatusBar, Platform } from "react-native";
import { Container, Content, Text, Button, View, Icon } from "native-base";
import Swiper from "react-native-swiper";
import firebase from "firebase";
import styles from "./styles";
import commonColor from "../../theme/variables/commonColor";

var deviceHeight = Dimensions.get("window").height;

class Login extends Component {
    db = firebase.firestore();

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loadingFB: false
        };
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate("HomeTabNavigation", { uid: user.uid });
            } else {
                this.setState({ loading: false });
            }
        });
    }

    authenticate = token => {
        const provider = firebase.auth.FacebookAuthProvider;
        const credential = provider.credential(token);
        return firebase.auth().signInAndRetrieveDataWithCredential(credential);
    };

    createUser = (uid, userData) => {
        var usersRef = this.db.collection("users");
        usersRef.doc(uid).set(userData);
    };

    login = async () => {
        this.setState({ loadingFB: true });
        const ADD_ID = "420075655217013";
        const options = {
            permissions: ["public_profile", "user_gender", "user_birthday", "email"]
            //permissions: ["public_profile", "email"]
        };
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(ADD_ID, options);

        if (type === "success") {
            const fields = ["id", "first_name", "last_name", "gender", "birthday", "work"];
            const response = await fetch(
                `https://graph.facebook.com/me?fields=${fields.toString()}&access_token=${token}`
            );
            const userData = await response.json();
            const userInfo = await this.authenticate(token);
            this.setState({ loadingFB: false });
            this.createUser(userInfo.user.uid, userData);
        } else {
            this.setState({ loadingFB: false });
        }
    };

    render() {
        return (
            <Container style={{ backgroundColor: "#fff" }}>
                <StatusBar
                    backgroundColor={
                        Platform.OS === "android" ? commonColor.statusBarColor : "transparent"
                    }
                    barStyle="dark-content"
                />
                <Content scrollEnabled={false}>
                    <Swiper
                        height={deviceHeight / 1.4}
                        loop={false}
                        dot={<View style={styles.swiperDot} />}
                        activeDot={<View style={styles.swiperActiveDot} />}
                    >
                        <View style={styles.swiperSlidesView}>
                            <Text style={styles.loginText}>
                                Discover interesting people around you
                            </Text>
                            <View style={styles.swiperImageView}>
                                <Image
                                    source={require("../../../assets/e1.jpg")}
                                    style={styles.image1}
                                    resizeMode="contain"
                                />
                            </View>
                        </View>

                        <View style={styles.swiperSlidesView}>
                            <Text style={styles.loginText}>
                                Anonymously like or pass on each person
                            </Text>
                            <Image
                                source={require("../../../assets/likeSquare.png")}
                                style={styles.image1}
                                resizeMode="contain"
                            />
                        </View>

                        <View style={styles.swiperSlidesView}>
                            <Text style={styles.loginText}>When someone likes you back...</Text>
                            <View style={styles.image}>
                                <Image
                                    source={require("../../../assets/1.png")}
                                    style={styles.img1}
                                    resizeMode="contain"
                                />
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginHorizontal: 10
                                    }}
                                >
                                    <Image
                                        source={require("../../../assets/rf1.jpg")}
                                        style={[styles.img2, { left: 10 }]}
                                    />
                                    <Image
                                        source={require("../../../assets/m4.jpg")}
                                        style={[styles.img2, { right: 10 }]}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.swiperSlidesView}>
                            <Text style={styles.loginText}>Chat and get to know your matches</Text>
                            <Image
                                source={require("../../../assets/2.png")}
                                style={styles.image1}
                                resizeMode="contain"
                            />
                        </View>
                    </Swiper>

                    <Button
                        block
                        rounded
                        style={styles.loginFBBtn}
                        //onPress={() => this.props.navigation.navigate("HomeTabNavigation")}
                        onPress={this.login}
                    >
                        <Icon
                            name="facebook-official"
                            type="FontAwesome"
                            style={{ fontSize: 20, marginRight: 8 }}
                        />

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
                </Content>
                <View style={styles.noteView}>
                    <Text style={styles.noteText}>
                        By signing in, you agree with our terms of services and privacy settings
                    </Text>
                </View>
            </Container>
        );
    }
}

export default Login;
