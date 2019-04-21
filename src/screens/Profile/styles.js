var Dimensions = require("Dimensions");
var { width } = Dimensions.get("window");
import commonColor from "../../theme/variables/commonColor";

export default {
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    marginTop: 1
  },
  profileImageView: {
    alignItems: "center",
    marginTop: 25
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  editIconView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    right: 35,
    backgroundColor: commonColor.brandPrimary,
    borderRadius: 18,
    width: 35,
    height: 35,
    overflow: "hidden"
  },
  editIcon: {
    fontSize: 22,
    alignSelf: "center",
    color: "#FFFFFF"
  },
  profileDescriptionView: {
    marginTop: 15
  },
  nameAndAgeText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center"
  },
  workplaceText: {
    fontSize: 14,
    color: commonColor.contentTextColor,
    textAlign: "center"
  },
  settingsBtn: {
    marginTop: 20,
    alignSelf: "center"
  },
  settingsBtnText: {
    color: commonColor.brandPrimary,
    fontWeight: "600",
    fontSize: 14
  },
  goingOutView: {
    left: 1,
    width: width
  },
  goingOutTextView: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    position: "absolute",
    bottom: 0
  },
  goingOutBtn: {
    width: width / 1.8,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 30
  },
  goingOutBtnText: {
    fontSize: 14,
    fontWeight: "800"
  }
};
