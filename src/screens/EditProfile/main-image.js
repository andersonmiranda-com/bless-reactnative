import React, { Component } from "react";
import { View, Platform, Image } from "react-native";
import { Icon } from "native-base";
import commonColor from "../../theme/variables/commonColor";

class MainImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <View style={styles.box}>
            <Image
              style={{ width: null, height: 210, borderRadius: 4 }}
              source={this.props.source ? this.props.source : null}
            />
          </View>
          <View style={styles.addButtonLayout}>
            <View style={styles.addButton}>
              {this.props.source
                ? <Icon name="md-close" style={styles.icon} />
                : <Icon name="md-add" style={styles.icon} />}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 2,
    height: 210,
    marginRight: 10
  },
  boxContainer: {
    flex: 1,
    marginBottom: Platform.OS === "android" ? 5 : undefined,
    marginRight: Platform.OS === "android" ? 5 : undefined
  },
  box: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderRadius: 4
  },
  addButtonLayout: {
    backgroundColor: commonColor.brandPrimary,
    height: 25,
    width: 25,
    borderRadius: 12.5,
    position: "absolute",
    bottom: -5,
    right: -5,
    borderWidth: 3,
    borderColor: "white"
  },
  addButton: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 2
  },
  icon: {
    color: "white",
    fontSize: 15
  }
};

export default MainImage;
