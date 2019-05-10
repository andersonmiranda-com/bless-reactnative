import { StyleSheet, Platform, Dimensions } from "react-native";
import variables from "../theme/variables/commonColor";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;

const isIphoneX = platform === "ios" && deviceHeight >= 812;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },

    containerVertical: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },

    containerCentered: {
        alignItems: "center",
        justifyContent: "center"
    },

    containerMarginTop: {
        marginTop: deviceHeight * 0.17
    },

    backgroundLight: {
        backgroundColor: "#F5F5F5"
    },

    smallText: {
        fontSize: 12
    },

    colorDanger: {
        color: variables.brandDanger
    },

    badgeSmall: {
        top: -3,
        alignSelf: "center",
        left: 12,
        zIndex: 99,
        height: 18,
        minWidth: 18,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0
    },
    badgeTextSmall: {
        fontSize: 12,
        lineHeight: platform === "ios" ? 15 : 15,
        marginTop: 1,
        marginLeft: 2,
        marginRight: 2
    },

    badgeTab: {
        top: -7,
        alignSelf: "center",
        left: 10,
        zIndex: 99,
        height: 16,
        padding: 1.7,
        paddingHorizontal: 2
    },

    textBadgeTab: {
        fontSize: 11,
        fontWeight: platform === "ios" ? "600" : undefined,
        lineHeight: platform === "ios" ? 12 : 15
    },

    iconBadgeTab: {
        marginTop: -18
    },

    inputFieldLabel: {
        fontSize: variables.inputFontSize - 2,
        color: variables.brandMedium
    },

    iconArrowRight: {
        fontSize: 15,
        left: 8,
        color: variables.brandMedium
    }
});

export default styles;
