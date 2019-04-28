import React, { Component } from "react";
import { Image, ImageBackground, View } from "react-native";
import {
    Container,
    Text,
    Card,
    CardItem,
    DeckSwiper,
    Grid,
    Row,
    Icon,
    Button,
    Right,
    Body
} from "native-base";
import commonColor from "../../theme/variables/commonColor";
import * as firebase from "firebase";
import moment from "moment";
import styles from "./styles";
import data from "./data";

class PhotoCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            direction: null,
            opac: 0,
            profiles: []
        };
    }

    componentDidMount() {
        firebase
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
            });
    }

    _renderCard = item => {
        const { birthday, name, bio, id } = item;
        const profileBday = moment(birthday, "MM/DD/YYYY");
        const profileAge = moment().diff(profileBday, "years");
        const fbImage = `https://graph.facebook.com/${id}/picture?height=500`;

        const navigation = this.props.navigation;
        return (
            <Card activeOpacity={1} style={{ borderRadius: 10 }}>
                <CardItem
                    button
                    style={styles.deckswiperImageCarditem}
                    activeOpacity={1}
                    cardBody
                    onPress={() => navigation.navigate("PhotoCardDetails")}
                >
                    <ImageBackground style={styles.cardMain} source={{ uri: fbImage }}>
                        {this.state.direction === "left" && (
                            <View
                                style={{
                                    opacity: -this.state.opac / 150,
                                    position: "absolute",
                                    right: 30,
                                    top: 40,
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
                                        color: commonColor.brandPrimary,
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
                                        color: commonColor.brandSuccess,
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
                            onSwiping={(dir, opa) => this.setState({ direction: dir, opac: opa })}
                            renderTop={this._renderCard}
                            renderBottom={this._renderBottom}
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
                            onPress={() => navigation.navigate("PhotoCardDetails")}
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
