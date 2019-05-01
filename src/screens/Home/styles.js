import { Platform } from "react-native";
import commonColor from "../../theme/variables/commonColor";
var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

const platform = Platform.OS;
const isIphoneX =
    platform === "ios" && (height === 812 || width === 812 || height === 896 || width === 896);

export default {
    tabs: {
        backgroundColor: "#FFF",
        height: Platform.OS === "android" ? 55 : 70,
        flexDirection: "row",
        paddingTop: Platform.OS === "android" ? 15 : 30,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.1)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 3
    },
    tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 10
    },
    iconBtn: {
        backgroundColor: "#D9E0E4",
        width: 35,
        height: 35,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 7
    },
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
        marginTop: 15,
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
        fontWeight: "600",
        opacity: 0.879,
        fontFamily: "arial"
    },
    subtextLeft: {
        fontSize: 12,
        color: commonColor.contentTextColor,
        fontWeight: "600",
        opacity: 0.879,
        fontFamily: "arial"
    },
    iconRight: {
        color: Platform.OS === "ios" ? "#a3a3a3" : commonColor.contentTextColor,
        paddingRight: 4
    },
    subtextRight: {
        color: commonColor.contentTextColor,
        fontWeight: "600",
        opacity: 0.879,
        fontFamily: "arial",
        paddingBottom: 4
    },
    bottomGrid: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0
    },
    bottomRowStyle: {
        marginTop: Platform.OS === "android" ? 5 : 10,
        justifyContent: "space-around"
    },
    bottomRoundedSmallPills: {
        borderRadius: 25,
        marginTop: 8,
        height: 50,
        width: 50,
        backgroundColor: "white",
        alignItems: "center",
        // paddingTop: 10,
        paddingLeft: 8,
        paddingRight: 8,
        elevation: 3,
        justifyContent: "center",
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderColor: "#aaa",
        borderWidth: Platform.OS === "ios" ? undefined : 0.2,
        shadowOffset: {
            height: 2,
            width: 1
        }
    },
    bottomRoundedPills: {
        borderRadius: 33,
        height: 65,
        width: 65,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 6,
        elevation: 3,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderColor: "#aaa",
        borderWidth: Platform.OS === "ios" ? undefined : 0.2,
        shadowOffset: {
            height: 2,
            width: 1
        }
    }
};
