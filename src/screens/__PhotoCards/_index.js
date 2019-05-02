import React, { Component } from "react";
import { Image, ImageBackground, View } from "react-native";
import {
    Container,
    Text,
    Card,
    CardItem,
    Grid,
    Row,
    Icon,
    Button,
    Body,
    Spinner
} from "native-base";
import commonColor from "../../theme/variables/commonColor";

import moment from "moment";

import Card from "../../components/Card";
import styles from "./styles";

class PhotoCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            direction: null,
            opac: 0
        };
    }

    _renderCard = item => {
        const { birthday, first_name, bio, id } = item;
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
                                    flex: 1,
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    justifyContent: "flex-start",
                                    paddingTop: 30,
                                    paddingRight: 30
                                }}
                            >
                                <View
                                    style={{
                                        opacity: -this.state.opac / 150,
                                        backgroundColor: commonColor.brandPrimary,
                                        borderColor: commonColor.brandPrimary,
                                        borderWidth: 2,
                                        borderRadius: 30,
                                        width: 60,
                                        height: 60,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Icon
                                        style={{
                                            backgroundColor: "transparent",
                                            color: "white",
                                            fontSize: 40,
                                            textAlign: "center",
                                            lineHeight: 40,
                                            marginTop: 6,
                                            marginLeft: 2
                                        }}
                                        name="md-close"
                                    />
                                </View>
                            </View>
                        )}
                        {this.state.direction === "right" && (
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    justifyContent: "flex-start",
                                    paddingTop: 30,
                                    paddingLeft: 30
                                }}
                            >
                                <View
                                    style={{
                                        opacity: this.state.opac / 150,
                                        backgroundColor: commonColor.brandSuccess,
                                        borderColor: commonColor.brandSuccess,
                                        borderWidth: 2,
                                        borderRadius: 30,
                                        width: 60,
                                        height: 60,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Icon
                                        style={{
                                            backgroundColor: "transparent",
                                            color: "white",
                                            fontSize: 40,
                                            textAlign: "center",
                                            lineHeight: 40,
                                            marginTop: 10,
                                            marginLeft: 2
                                        }}
                                        name="md-heart"
                                    />
                                </View>
                            </View>
                        )}
                        {this.state.direction === "top" && (
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    paddingBottom: 30
                                }}
                            >
                                <View
                                    style={{
                                        opacity: -this.state.opac / 150,
                                        backgroundColor: commonColor.brandInfo,
                                        borderColor: commonColor.brandInfo,
                                        borderWidth: 0,
                                        borderRadius: 10,
                                        width: 200,
                                        height: 50,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "row",
                                        padding: 10
                                    }}
                                >
                                    <Icon
                                        style={{
                                            backgroundColor: "transparent",
                                            color: "white",
                                            fontSize: 30,
                                            textAlign: "center",
                                            marginTop: 0,
                                            marginLeft: 2,
                                            width: 32
                                        }}
                                        name="md-star"
                                    />
                                    <Text
                                        style={{
                                            backgroundColor: "transparent",
                                            color: "white",
                                            fontSize: 26,
                                            fontWeight: "700",
                                            textAlign: "center",
                                            lineHeight: 26,
                                            marginTop: 5,
                                            marginLeft: 2,
                                            marginRight: 8
                                        }}
                                    >
                                        SUPER LIKE
                                    </Text>
                                </View>
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
                            {first_name}, {profileAge}
                        </Text>
                        <Text style={styles.subtextLeft}>{bio}</Text>
                    </Body>
                </CardItem>
            </Card>
        );
    };

    _renderBottom = item => {
        const { birthday, first_name, bio, id } = item;
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
                            {first_name}, {profileAge}
                        </Text>
                        <Text style={styles.subtextLeft}>{bio}</Text>
                    </Body>
                </CardItem>
            </Card>
        );
    };

    _renderEmpty = () => {
        return (
            <View>
                <Text
                    style={{
                        alignSelf: "center"
                    }}
                >
                    End of Cards
                </Text>
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
        const { profiles, loading } = this.props;

        return (
            <Container style={styles.wrapper}>
                {profiles.length === 0 &&
                    !!loading && (
                        <View style={styles.wrapperCentered}>
                            <Spinner color="black" />
                        </View>
                    )}
                {profiles.length > 0 &&
                    !loading && (
                        <View style={{ flex: 1 }}>
                            {profiles
                                .slice(profileIndex, profileIndex + 3)
                                .reverse()
                                .map((profile,index) => {
                                    return (
                                        <Card
                                            key={profile.uid}
                                            index={index}
                                            profile={profile}
                                            onSwipeOff={this.nextCard}
                                        />
                                    );
                                })}
                        </View>
                    )}
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

export default PhotoCards;