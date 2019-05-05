import { Platform } from "react-native";
var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");
import commonColor from "../../theme/variables/commonColor";

const platform = Platform.OS;
const isIphoneX =
    platform === "ios" && (height === 812 || width === 812 || height === 896 || width === 896);

export default {
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        paddingTop: isIphoneX ? 25 : 10
    },
    containerVertical: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },

    profileImageView: {
        alignItems: "center",
    },
    profileImage: {
        height: 150,
        width: 150,
        borderRadius: 75,
        marginBottom: 15
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
        fontFamily: "Rubik_Bold",
        textAlign: "center",
        marginBottom: 5
    },
    settingsBtn: {
        marginTop: 20,
        alignSelf: "center"
    },
};
