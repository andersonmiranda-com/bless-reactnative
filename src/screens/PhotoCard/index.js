import React, { Component } from "react";
import { Image, ImageBackground, View } from "react-native";
import { Container, Text, Card, CardItem, Grid, Row, Icon, Button, Body } from "native-base";
import { DeckSwiper } from "../../components/DeckSwiper";
import commonColor from "../../theme/variables/commonColor";
import * as firebase from "firebase";
import "firebase/firestore";
import moment from "moment";
import styles from "./styles";

class PhotoCard extends Component {
    db = firebase.firestore();

    constructor(props) {
        super(props);
        this.state = {
            direction: null,
            opac: 0,
            profiles: []
        };
    }

    componentDidMount() {
        var usersRef = this.db.collection("users");

        usersRef.get().then(querySnapshot => {
            let profiles = [];
            querySnapshot.forEach(doc => {
                const { name, bio, birthday, id } = doc.data();
                profiles.push({ name, bio, birthday, id });
            });
            this.setState({ profiles });
        });

        /*  firebase
            .database()
            .ref()
            .child("users")
            .once("value", snap => {
                let profiles = [];
                snap.forEach(profile => {
                    const { name, bio, birthday, id } = profile.val();
                    profiles.push({ name, bio, birthday, id });
                });
                this.setState({ profiles });
            }); */
    }

    _renderCard = item => {
        const { birthday, name, bio, id } = item;
        const profileBday = moment(birthday, "MM/DD/YYYY");
        const profileAge = moment().diff(profileBday, "years");
        const fbImage = `https://graph.facebook.com/${id}/picture?height=500`;
        const navigation = this.props.navigation;

        return (
            <Card activeOpacity={1} style={{ borderRadius: 10 }}>
                <CardItem button style={styles.deckswiperImageCarditem} activeOpacity={1} cardBody>
                    <ImageBackground style={styles.cardMain} source={{ uri: fbImage }}>
                        {this.state.direction === "left" && (
                            <View
                                style={{
                                    opacity: -this.state.opac / 150,
                                    position: "absolute",
                                    right: 30,
                                    top: 40,
                                    backgroundColor: commonColor.brandPrimary,
                                    borderColor: commonColor.brandPrimary,
                                    borderWidth: 2,
                                    borderRadius: 30,
                                    width: 60,
                                    height: 60,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Icon
                                    style={{
                                        backgroundColor: "transparent",
                                        color: "white",
                                        fontSize: 40,
                                        textAlign: "center",
                                        lineHeight: 40,
                                        marginTop: 8,
                                        marginLeft: 2
                                    }}
                                    name="md-close"
                                />
                            </View>
                        )}
                        {this.state.direction === "right" && (
                            <View
                                style={{
                                    opacity: this.state.opac / 150,
                                    position: "absolute",
                                    left: 30,
                                    top: 40,
                                    backgroundColor: commonColor.brandSuccess,
                                    borderColor: commonColor.brandSuccess,
                                    borderWidth: 2,
                                    borderRadius: 30,
                                    width: 60,
                                    height: 60,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Icon
                                    style={{
                                        backgroundColor: "transparent",
                                        color: "white",
                                        fontSize: 40,
                                        textAlign: "center",
                                        lineHeight: 40,
                                        marginTop: 8,
                                        marginLeft: 2
                                    }}
                                    name="md-heart"
                                />
                            </View>
                        )}
                        {this.state.direction === "top" && (
                            <View
                                style={{
                                    opacity: -this.state.opac / 150,
                                    position: "absolute",
                                    right: 80,
                                    bottom: 50,
                                    backgroundColor: commonColor.brandInfo,
                                    borderColor: commonColor.brandInfo,
                                    borderWidth: 2,
                                    borderRadius: 40,
                                    width: 80,
                                    height: 80,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Icon
                                    style={{
                                        backgroundColor: "transparent",
                                        color: "white",
                                        fontSize: 45,
                                        textAlign: "center",
                                        lineHeight: 40,
                                        marginTop: 8,
                                        marginLeft: 2
                                    }}
                                    name="md-star"
                                />
                            </View>
                        )}
                    </ImageBackground>
                </CardItem>
                <CardItem
                    button
                    activeOpacity={1}
                    onPress={() => navigation.navigate("PhotoCardDetails")}
                    style={styles.deckswiperDetailsCarditem}
                >
                    <Body>
                        <Text style={styles.text}>
                            {name}, {profileAge}
                        </Text>
                        <Text style={styles.subtextLeft}>{bio}</Text>
                    </Body>
                    (
                    {/* <Right>
                        <Button transparent>
                            <Icon name="md-book" style={styles.iconRight} />
                            <Text style={styles.subtextRight}>{item.num}</Text>
                        </Button>
                    </Right> */}
                    )
                </CardItem>
            </Card>
        );
    };

    _renderBottom = item => {
        const { birthday, name, bio, id } = item;
        const profileBday = moment(birthday, "MM/DD/YYYY");
        const profileAge = moment().diff(profileBday, "years");
        const fbImage = `https://graph.facebook.com/${id}/picture?height=500`;

        return (
            <Card style={{ borderRadius: 10 }}>
                <CardItem
                    style={{
                        borderTopLeftRadius: 10,
                        overflow: "hidden",
                        borderTopRightRadius: 10
                    }}
                    cardBody
                >
                    <Image style={styles.cardMain} source={{ uri: fbImage }} />
                </CardItem>
                <CardItem style={styles.deckswiperDetailsCarditem}>
                    <Body>
                        <Text style={styles.text}>
                            {name}, {profileAge}
                        </Text>
                        <Text style={styles.subtextLeft}>{bio}</Text>
                    </Body>
                    (
                    {/* <Right>
                        <Button transparent>
                            <Icon name="md-book" style={styles.iconRight} />
                            <Text style={styles.subtextRight}>{item.num}</Text>
                        </Button>
                    </Right> */}
                    )
                </CardItem>
            </Card>
        );
    };

    _renderEmpty = () => {
        return (
            <View style={{ alignSelf: "center" }}>
                <Text>Over</Text>
            </View>
        );
    };

    _onSwiping = (dir, opa) => {
        this.setState({ direction: dir, opac: opa });
    };

    _onSwipeRight = item => {
        console.log("Swipe right", item);
    };

    _onSwipeLeft = item => {
        console.log("Swipe left", item);
    };

    _onSwipeTop = item => {
        console.log("Swipe top", item);
    };

    _onSwipeBottom = item => {
        this.props.navigation.navigate("PhotoCardDetails");
    };

    render() {
        const navigation = this.props.navigation;
        return (
            <Container style={styles.wrapper}>
                <View style={styles.deckswiperView}>
                    {this.state.profiles.length > 0 && (
                        <DeckSwiper
                            activeOpacity={1}
                            dataSource={this.state.profiles}
                            ref={mr => (this._deckSwiper = mr)}
                            onSwiping={this._onSwiping}
                            onSwipeRight={this._onSwipeRight}
                            onSwipeLeft={this._onSwipeLeft}
                            onSwipeTop={this._onSwipeTop}
                            onSwipeBottom={this._onSwipeBottom}
                            renderItem={this._renderCard}
                            renderTop={this._renderCard}
                            renderBottom={this._renderBottom}
                            renderEmpty={this._renderEmpty}
                            looping={false}
                        />
                    )}
                </View>
                <Grid style={styles.bottomGrid}>
                    <Row style={styles.bottomRowStyle}>
                        <Button style={styles.bottomRoundedSmallPills}>
                            <Icon
                                name="md-refresh"
                                style={{
                                    color: commonColor.brandWarning,
                                    fontSize: 34
                                }}
                            />
                        </Button>
                        <Button
                            style={styles.bottomRoundedPills}
                            onPress={() => this._deckSwiper._root.swipeLeft()}
                        >
                            <Icon
                                name="md-close"
                                style={{
                                    color: commonColor.brandDanger,
                                    fontSize: 40,
                                    lineHeight: 40
                                }}
                            />
                        </Button>
                        <Button
                            style={styles.bottomRoundedPills}
                            onPress={() => this._deckSwiper._root.swipeRight()}
                        >
                            <Icon
                                name="md-heart"
                                style={{
                                    color: commonColor.brandSuccess,
                                    fontSize: 35,
                                    lineHeight: 40,
                                    marginLeft: 2,
                                    marginRight: 2
                                }}
                            />
                        </Button>
                        <Button
                            style={styles.bottomRoundedSmallPills}
                            onPress={() => this._deckSwiper._root.swipeTop()}
                        >
                            <Icon
                                name="md-star"
                                style={{
                                    color: commonColor.brandInfo,
                                    fontSize: 34,
                                    marginLeft: 3,
                                    marginRight: 3
                                }}
                            />
                        </Button>
                    </Row>
                </Grid>
            </Container>
        );
    }
}

export default PhotoCard;
