import React, { Component } from "react";
import { View, Image, Platform } from "react-native";
import { Container, Content, Text, Grid, Row, Icon, Button } from "native-base";
import Swiper from "react-native-swiper";
import commonColor from "../../theme/variables/commonColor";
import styles from "./styles";

var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

class PhotoCardDetails extends Component {
  render() {
    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <Content style={{ marginTop: Platform.OS === "ios" ? 20 : undefined }}>
          <View style={styles.instagramPhotosCarousel}>
            <Swiper
              width={width}
              height={height / 1.5}
              dot={
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: "rgba(255,255,255,0.5)" }
                  ]}
                />
              }
              activeDot={
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: commonColor.brandPrimary }
                  ]}
                />
              }
              loop={false}
            >
              <View style={styles.slideView}>
                <Image
                  style={styles.image}
                  source={require("../../../assets/r4.jpg")}
                />
              </View>
              <View style={styles.slideView}>
                <Image
                  style={styles.image}
                  source={require("../../../assets/r5.jpg")}
                />
              </View>
              <View style={styles.slideView}>
                <Image
                  style={styles.image}
                  source={require("../../../assets/r1.jpeg")}
                />
              </View>
            </Swiper>
            <Button
              onPress={() => this.props.navigation.goBack()}
              style={styles.backBtn}
            >
              <Icon name="ios-arrow-back" style={styles.backBtnIcon} />
            </Button>
          </View>
          <View style={styles.subTextView}>
            <Text style={styles.nameText}>Rachel McAdams, 26</Text>
            <Text style={styles.workingText}>Model, Actress</Text>
            <Text style={styles.distanceAwayText}>3 km away</Text>
          </View>
          <View style={styles.quoteView}>
            <Text style={styles.quoteText}>
              Good things happen when we meet strangers!! Also, about section
              here, this is specific user details page
            </Text>
          </View>
          <View style={styles.instagramPhotoCountView}>
            <Text>200 Instagram Photos</Text>
          </View>
          <View>
            <Swiper
              width={width}
              height={
                Platform.OS === "ios"
                  ? (width / 3 - 5) * 2
                  : (width / 3 + 14) * 2
              }
              paginationStyle={styles.swiperPaginationStyle}
              dot={
                <View
                  style={[
                    styles.thumbnailDot,
                    {
                      backgroundColor: "rgba(0,0,0,0.3)"
                    }
                  ]}
                />
              }
              activeDot={
                <View
                  style={[
                    styles.thumbnailDot,
                    { backgroundColor: commonColor.brandPrimary }
                  ]}
                />
              }
              loop={false}
            >
              <View style={styles.instagramCarouselView}>
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r3.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r4.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r5.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r6.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r1.jpeg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r2.jpg")}
                />
              </View>
              <View style={styles.instagramCarouselView}>
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r2.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r6.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r3.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r1.jpeg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r4.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r5.jpg")}
                />
              </View>
              <View style={styles.instagramCarouselView}>
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r6.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r5.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r4.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r3.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r2.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r1.jpeg")}
                />
              </View>
              <View style={styles.instagramCarouselView}>
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r1.jpeg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r2.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r3.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r4.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r5.jpg")}
                />
                <Image
                  style={styles.thumbnail}
                  source={require("../../../assets/r6.jpg")}
                />
              </View>
            </Swiper>
          </View>
          {/*here*/}
          <View style={styles.interestTextHeadingView}>
            <Text>3 interests</Text>
          </View>
          <View style={styles.interestsView}>
            <Button bordered style={{ margin: 5 }}>
              <Text> Southpaw</Text>
            </Button>
            <Button bordered style={{ margin: 5 }}>
              <Text> Hollywood</Text>
            </Button>
            <Button bordered style={{ margin: 5 }}>
              <Text style={styles.interestText}> Game of Thrones</Text>
            </Button>
          </View>
        </Content>
        <View>
          <Grid style={styles.bottomPillsView}>
            <Row style={styles.bottomRowStyle}>
              <Button
                danger
                onPress={() => this.props.navigation.goBack()}
                style={styles.bottomRoundedPillsBtn}
              >
                <Icon
                  active
                  name="close"
                  style={styles.bottomRoundedPillsCloseIcon}
                />
              </Button>
              <Button info style={styles.bottomRoundedPillsBtn}>
                <Icon
                  active
                  name="star"
                  style={styles.bottomRoundedPillsStarIcon}
                />
              </Button>
              <Button success style={styles.bottomRoundedPillsBtn}>
                <Icon
                  active
                  name="heart"
                  style={styles.bottomRoundedPillsHeartIcon}
                />
              </Button>
            </Row>
          </Grid>
        </View>
      </Container>
    );
  }
}

export default PhotoCardDetails;
