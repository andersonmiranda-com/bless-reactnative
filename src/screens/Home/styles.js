import { Platform } from "react-native";
import commonColor from "../../theme/variables/commonColor";
var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

const platform = Platform.OS;
const isIphoneX =
    platform === "ios" && (height === 812 || width === 812 || height === 896 || width === 896);

export default {
    activeIcon: {
        color: commonColor.brandPrimary
    },
    inActiveIcon: {
        color: "#D9E0E4"
    },
    wrapper: {
        flex: 1,
        backgroundColor: "#FFF",
        paddingTop: isIphoneX ? 25 : 10
    },
    wrapperCentered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    deckswiperView: {
        marginHorizontal: 15,
        marginTop:  platform === "ios" ? 20 : 5,
        flex: 1
    },
    deckswiperImageCarditem: {
        borderTopLeftRadius: 10,
        overflow: "hidden",
        borderTopRightRadius: 10
    },
    cardMain: {
        height:
            width < 330
                ? Platform.OS === "ios"
                    ? height / 1.8
                    : height / 1.8
                : Platform.OS === "ios"
                    ? height / 1.6
                    : height / 1.6,
        flex: 1,
        width: null
    },
    deckswiperDetailsCarditem: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingTop: Platform.OS === "ios" ? 15 : 10,
        paddingBottom: 5
    },
    text: {
        fontSize: 16,
        color: "#393E40",
        fontFamily: "Rubik_Bold",
        opacity: 0.879,
        fontFamily: "arial"
    },
    subtextLeft: {
        fontSize: 12,
        color: commonColor.contentTextColor,
        fontFamily: "Rubik_Bold",
        opacity: 0.879,
        fontFamily: "arial"
    },
    iconRight: {
        color: Platform.OS === "ios" ? "#a3a3a3" : commonColor.contentTextColor,
        paddingRight: 4
    },
    subtextRight: {
        color: commonColor.contentTextColor,
        fontFamily: "Rubik_Bold",
        opacity: 0.879,
        fontFamily: "arial",
        paddingBottom: 4
    },
    bottomGrid: {
        position: "absolute",
        bottom: 15,
        left: 0,
        right: 0
    },
    bottomRowStyle: {
        marginTop: Platform.OS === "android" ? 5 : 10,
        justifyContent: "space-around"
    },
    bottomRoundedSmallPills: {
        borderRadius: 23,
        marginTop: 8,
        height: 46,
        width: 46,
        backgroundColor: "white",
        alignItems: "center",
        // paddingTop: 10,
        paddingLeft: 8,
        paddingRight: 8,
        elevation: 3,
        justifyContent: "center",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderColor: "white",
        borderWidth: Platform.OS === "ios" ? undefined : 0,
        shadowOffset: {
            height: 2,
            width: 1
        }
    },
    bottomRoundedPills: {
        borderRadius: 29,
        height: 58,
        width: 58,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 6,
        elevation: 3,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderColor: "white",
        borderWidth: Platform.OS === "ios" ? undefined : 0,
        shadowOffset: {
            height: 2,
            width: 1
        }
    }
};
