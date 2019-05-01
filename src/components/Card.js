import React, { Component } from "react";
import {
    ImageBackground,
    Platform,
    StyleSheet,
    View,
    PanResponder,
    Animated,
    Dimensions
} from "react-native";
import { Icon, Text } from "native-base";
import commonColor from "../theme/variables/commonColor";
import moment from "moment";

const { width, height } = Dimensions.get("window");
const platform = Platform.OS;
const isIphoneX =
    platform === "ios" && (height === 812 || width === 812 || height === 896 || width === 896);

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            direction: null,
            opac: 0
        };
    }

    componentWillMount() {
        this.pan = new Animated.ValueXY();
        this.cardPanResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderMove: (e, gestureState) => {
                const absDx = Math.abs(gestureState.dx);
                const absDy = Math.abs(gestureState.dy);

                let directionVertical;

                if (absDy >= absDx) {
                    directionVertical = true;
                } else {
                    directionVertical = false;
                }

                if (gestureState.dx > 20 && !directionVertical) {
                    this.setState({ direction: "right", opac: gestureState.dx });
                } else if (gestureState.dx < -20 && !directionVertical) {
                    this.setState({ direction: "left", opac: gestureState.dx });
                } else if (gestureState.dy < -20 && directionVertical) {
                    this.setState({ direction: "top", opac: gestureState.dy });
                }

                let val = Math.abs((gestureState.dx + gestureState.dy / 2) * 0.001);

                if (Math.abs(gestureState.dx) > 20) {
                    val = Math.abs(gestureState.dx * 0.0013);
                    if (val > 0.2) {
                        val = 0.2;
                    }
                } else if (Math.abs(gestureState.dy) > 20) {
                    val = Math.abs(gestureState.dy * 0.0013);
                    if (val > 0.2) {
                        val = 0.2;
                    }
                }
                Animated.event([null, { dx: this.pan.x, dy: this.pan.y }])(e, gestureState);
            },

            onPanResponderRelease: (e, { dx, dy }) => {
                const absDx = Math.abs(dx);
                const absDy = Math.abs(dy);
                const directionX = absDx / dx;
                const directionY = absDy / dy;

                let directionVertical;
                let abs;
                let direction;

                if (absDy >= absDx) {
                    directionVertical = true;
                    abs = absDy;
                    direction = directionY;
                } else {
                    directionVertical = false;
                    abs = absDx;
                    direction = directionX;
                }

                if (abs > 120) {
                    if (direction > 0 && directionVertical) {
                        direction = "bottom";
                    } else if (direction < 0 && directionVertical) {
                        direction = "top";
                    } else if (direction > 0 && !directionVertical) {
                        direction = "right";
                    } else if (direction < 0 && !directionVertical) {
                        direction = "left";
                    }

                    Animated.decay(this.pan, {
                        velocity: { x: 3 * directionX, y: 3 * directionY },
                        deceleration: 0.995
                    }).start(() => {
                        this.props.onSwipeOff(direction, this.props.profile.uid);
                    });
                } else {
                    Animated.spring(this.pan, {
                        toValue: { x: 0, y: 0 },
                        friction: 4.5
                    }).start();
                    this.setState({ direction: null, opac: 0 });
                }
            }
        });
    }

    doSwipe = (direction, cardTrigger) => {
        if (this.props.index === cardTrigger) {
            //garante que é a carta do topo
            this.setState({
                direction: direction,
                opac: direction === "left" || direction === "top" ? -150 : 150
            });
            setTimeout(() => {
                Animated.decay(this.pan, {
                    velocity: {
                        x:
                            direction === "left" || direction === "right"
                                ? direction === "left"
                                    ? -10
                                    : 10
                                : 0,
                        y: direction === "top" ? -12 : 0
                    },
                    deceleration: 0.98
                }).start(() => {
                    this.props.onSwipeOff(direction, this.props.profile.uid);
                });
            }, 500);
        }
    };

    render() {
        const { birthday, first_name, work, id } = this.props.profile;
        const bio = work && work[0] && work[0].position ? work[0].position.name : null;
        const profileBday = moment(birthday, "MM/DD/YYYY");
        const profileAge = moment().diff(profileBday, "years");
        const fbImage = `https://graph.facebook.com/${id}/picture?height=500`;

        const rotateCard = this.pan.x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ["-10deg", "0deg", "10deg"]
        });
        const animatedStyle = {
            transform: [
                { translateX: this.pan.x },
                { translateY: this.pan.y },
                { rotate: rotateCard }
            ]
        };

        return (
            <Animated.View
                {...this.cardPanResponder.panHandlers}
                style={[styles.card, animatedStyle]}
            >
                <ImageBackground style={{ flex: 1 }} source={{ uri: fbImage }}>
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
                    )}{" "}
                </ImageBackground>
                <View style={{ padding: 15 }}>
                    <Text style={{ fontSize: 20, fontWeight: "300" }}>
                        {first_name}, {profileAge}
                    </Text>
                    {bio ? (
                        <Text style={{ fontSize: 15, color: "darkgrey" }}>{bio}</Text>
                    ) : (
                        <View />
                    )}
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        position: "absolute",
        width: width - 30,
        height: height - 180 - (isIphoneX ? 50 : 0),
        overflow: "hidden",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "lightgrey",
        borderRadius: 10
    }
});
