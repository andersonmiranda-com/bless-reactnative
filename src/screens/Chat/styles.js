import { Platform, Dimensions } from "react-native";
import commonColor from "../../theme/variables/commonColor";

var { height, width } = Dimensions.get("window");

export default {
  container: {
    backgroundColor: "#FFF",
    marginTop: 1
  },
  imageView: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 5,
    paddingTop: Platform.OS === "ios" ? 50 : 0,
    marginTop: Platform.OS === "ios" ? 0 : 50
  },
  image: {
    height: height / 2.4,
    width: width / 1.5
  },
  matchesTextView: {
    marginTop: 10,
    marginBottom: 20
  },
  matchesText: {
    fontSize: 23,
    color: "rgba(0, 0, 0, 0.2)"
  },
  discoverBtn: {
    marginTop: 20,
    marginHorizontal: 40,
    borderRadius: 7,
    backgroundColor: commonColor.brandPrimary
  },
  discoverBtnText: {
    fontSize: 16,
    color: commonColor.inverseTextColor
  }
};
