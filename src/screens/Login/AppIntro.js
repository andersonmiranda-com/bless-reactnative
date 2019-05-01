import React, { Component } from "react";
import { Dimensions, Image } from "react-native";
import { Text, View } from "native-base";
import Swiper from "react-native-swiper";
import styles from "./styles";

var deviceHeight = Dimensions.get("window").height;

class appIntro extends Component {
    render() {
        return (
            <Swiper
                height={deviceHeight / 1.4}
                loop={false}
                dot={<View style={styles.swiperDot} />}
                activeDot={<View style={styles.swiperActiveDot} />}
            >
                <View style={styles.swiperSlidesView}>
                    <Text style={styles.loginText}>Discover interesting people around you</Text>
                    <View style={styles.swiperImageView}>
                        <Image
                            source={require("../../../assets/e1.jpg")}
                            style={styles.image1}
                            resizeMode="contain"
                        />
                    </View>
                </View>

                <View style={styles.swiperSlidesView}>
                    <Text style={styles.loginText}>Anonymously like or pass on each person</Text>
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
        );
    }
}

export default appIntro;
