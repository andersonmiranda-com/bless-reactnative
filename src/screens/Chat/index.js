import React, { Component } from "react";
import { Image, View } from "react-native";
import { Container, Content, Button, Text } from "native-base";
import styles from "./styles";

class Chat extends Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <Container style={styles.container}>
        <Content padder scrollEnabled={false}>
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
            rounded
            onPress={() => navigation.navigate("ChatList")}
          >
            <Text style={styles.discoverBtnText}>Discover New People</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Chat;
