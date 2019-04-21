import React, { Component } from "react";
import { Image, View, Text } from "react-native";
import { Container, Content, Button } from "native-base";
import styles from "./styles";

class Chat extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <Container style={styles.container}>
        <Content scrollEnabled={false}>
          <View style={styles.imageView}>
            <Image
              source={require("../../../assets/likeSquare.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.matchesTextView}>
              <Text style={styles.matchesText}>You have no matches yet</Text>
            </View>
          </View>
          <Button
            block
            large
            onPress={() => navigation.navigate("ChatList")}
            style={styles.discoverBtn}
          >
            <Text style={styles.discoverBtnText}>Discover New People</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Chat;
