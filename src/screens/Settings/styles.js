import { Platform } from "react-native";
import commonColor from "../../theme/variables/commonColor";

export default {
  container: {
    backgroundColor: "#F5F5F5"
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    paddingLeft: 2
  },
  locationSwipperCarditem: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 0.5,
      width: 0
    },
    elevation: 1.5,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5
  },
  swipText: {
    fontSize: 16,
    color: commonColor.contentTextColor
  },
  textBlue: {
    color: "cornflowerblue",
    fontSize: 16,
    fontWeight: "600"
  },
  cardItemText: {
    color: commonColor.contentTextColor,
    fontSize: 16
  },
  someText: {
    color: commonColor.lightTextColor,
    margin: 10
  },
  card: {
    paddingVertical: 10,
    backgroundColor: "white",
    flex: Platform.OS === "ios" ? 8 : 4.5,
    flexDirection: "column",
    borderRadius: 5,
    elevation: 1.5,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 0.5,
      width: 0
    }
  },
  cardItemHeaderView: {
    marginTop: -15,
    marginBottom: -15
  },
  redText: {
    color: commonColor.brandPrimary,
    fontSize: 18,
    fontWeight: "600"
  },
  switchBlock: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 10,
    elevation: 1.5,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 0.5,
      width: 0
    },
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  helpBtn: {
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 5,
    marginHorizontal: 3,
    elevation: 1.5,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      height: 0.5,
      width: 0
    }
  },
  helpBtnText: {
    fontSize: 18,
    fontWeight: "600",
    color: commonColor.contentTextColor,
    textAlign: "center"
  }
};
