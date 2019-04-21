import React, { Component } from "react";
import { Dimensions, Image, StatusBar, Platform } from "react-native";
import { Container, Content, Text, Button, View } from "native-base";
import Swiper from "react-native-swiper";
import styles from "./styles";
import commonColor from "../../theme/variables/commonColor";

var deviceHeight = Dimensions.get("window").height;

class Login extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <StatusBar
          backgroundColor={
            Platform.OS === "android"
              ? commonColor.statusBarColor
              : "transparent"
          }
          barStyle="dark-content"
        />
        <Content scrollEnabled={false}>
          <Swiper
            height={deviceHeight / 1.3}
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
                />
              </View>
            </View>

            <View style={styles.swiperSlidesView}>
              <Text style={styles.loginText}>
                Anonymously like or pass on each person
              </Text>
              <Image
                source={require("../../../assets/likeSquare.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </View>

            <View style={styles.swiperSlidesView}>
              <Text style={styles.loginText}>
                When someone likes you back...
              </Text>
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
              <Text style={styles.loginText}>
                Chat and get to know your matches
              </Text>
              <Image
                source={require("../../../assets/2.png")}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </Swiper>

          <Button
            block
            rounded
            style={styles.loginBtn}
            onPress={() => this.props.navigation.navigate("HomeTabNavigation")}
          >
            <Text style={styles.loginBtnText}>LOG IN WITH FACEBOOK</Text>
          </Button>
        </Content>
        <View style={styles.noteView}>
          <Text style={styles.noteText}>
            By signing in, you agree with our terms of services and privacy
            settings
          </Text>
        </View>
      </Container>
    );
  }
}

export default Login;
