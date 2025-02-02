import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { AppColors } from "../../utils/Global";

const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: "100%",
    margin: moderateScale(10),
    padding: moderateScale(5),
    backgroundColor: AppColors.White,
    borderRadius: moderateScale(10),
    elevation: 5,
    alignSelf: 'center'
  },
  iconCtn: {
    width: moderateScale(80),
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  dummyIconBG: {
    aspectRatio: 1,
    width: '80%',
    borderRadius: moderateScale(2000),
    backgroundColor: AppColors.iconColor,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  contentCtn: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: moderateScale(10),
  },
  heading: {
    fontFamily: "Lato-Bold",
    fontSize: moderateScale(18, 0.3),
    color: AppColors.iconColor,
  },
  desc: {
    fontFamily: "Lato-Regular",
    fontSize: moderateScale(16, 0.3),
    color: AppColors.Black,
    marginVertical: moderateVerticalScale(2)
  },
  dues: {
    fontFamily: "Lato-Regular",
    fontSize: moderateScale(12, 0.3),
    color: AppColors.iconColor,
    textAlign: 'right',
    marginTop: moderateVerticalScale(5)
  },
});

export default styles;
