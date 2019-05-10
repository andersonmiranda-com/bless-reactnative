import React, { Component } from "react";
import {
    Platform,
    Dimensions,
    ImageBackground,
    TouchableOpacity,
    StyleSheet,
    View,
    PanResponder,
    Animated
} from "react-native";
import { Icon, Text } from "native-base";
import { LinearGradient } from "expo";
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
                } else {
                    //return false;
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
                        this.props.onSwipeOff(direction, this.props.item._id);
                        Animated.spring(this.pan, {
                            toValue: { x: 0, y: 0 },
                            friction: 8
                        }).start();
                        return false;
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
                        this.props.onSwipeOff(direction, this.props.item._id);
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
                    this.props.onSwipeOff(direction, this.props.item._id);
                });
            }, 500);
        }
    };

    render() {
        const { birthday, first_name, bio, _id, image } = this.props.item;
        const itemAge = moment().diff(birthday, "years");

        let animatedStyle;

        if ((Platform.OS === "android" && Platform.Version > 27) || Platform.OS === "ios") {
            let rotateCard = this.pan.x.interpolate({
                inputRange: [-200, 0, 200],
                outputRange: ["-10deg", "0deg", "-10deg"]
            });

            animatedStyle = {
                transform: [
                    { translateX: this.pan.x },
                    { translateY: this.pan.y },
                    { rotate: rotateCard }
                ]
            };
        } else {
            animatedStyle = {
                transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }]
            };
        }

        return (
            <Animated.View
                {...this.cardPanResponder.panHandlers}
                style={[styles.card, animatedStyle]}
            >
                <ImageBackground
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "stretch"
                    }}
                    source={{ uri: image }}
                >
                    <View
                        style={{
                            flex: 5,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            paddingTop: 30,
                            paddingRight: 30,
                            paddingLeft: 30
                        }}
                    >
                        <View
                            style={{
                                opacity:
                                    this.state.direction === "right" ? this.state.opac / 150 : 0,
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
                                    marginTop: platform === "ios" ? 10 : 5,
                                    marginLeft: 2
                                }}
                                name="md-heart"
                            />
                        </View>

                        <View
                            style={{
                                opacity:
                                    this.state.direction === "left" ? -this.state.opac / 150 : 0,
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
                                    marginTop: platform === "ios" ? 6 : 1,
                                    marginLeft: 2
                                }}
                                name="md-close"
                            />
                        </View>
                    </View>

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
                                opacity:
                                    this.state.direction === "top" ? -this.state.opac / 150 : 0,
                                backgroundColor: commonColor.brandInfo,
                                borderColor: commonColor.brandInfo,
                                borderWidth: 0,
                                borderRadius: 10,
                                width: 200,
                                height: 50,
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                padding: 10,
                                zIndex: 5
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
                                    fontFamily: "Rubik_Bold",
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

                    <LinearGradient
                        colors={["#00000000", "#00000030", "#00000070"]}
                        locations={[0, 0.3, 1]}
                        style={{
                            padding: 20,
                            flex: 1,
                            alignSelf: "stretch",
                            maxHeight: 80
                        }}
                    >
                        <TouchableOpacity onPress={() => this.props.onCardOpen(_id)}>
                            <Text
                                style={{ fontSize: 22, fontFamily: "Rubik_Bold", color: "white" }}
                            >
                                {first_name}, {itemAge}
                            </Text>
                            {bio ? (
                                <Text style={{ fontSize: 16, color: "white" }}>{bio}</Text>
                            ) : (
                                <View />
                            )}
                        </TouchableOpacity>
                    </LinearGradient>
                </ImageBackground>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        position: "absolute",
        width: width - 30,
        height: height - 168 - (platform !== "ios" ? 10 : 0) - (isIphoneX ? 50 : 0),
        overflow: "hidden",
        backgroundColor: "white",
        //        borderWidth: 1,
        //        borderColor: "lightgrey",
        borderRadius: 10
    }
});
