import { StyleSheet } from "react-native";
import {
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import { AppColors } from "../../../utils/Global";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: moderateScale(10),
    backgroundColor: AppColors.White,
  },
  logoCtn: {
    height: moderateVerticalScale(200),
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: moderateScale(190, 0.3),
    height: moderateVerticalScale(50, 0.3),
    alignSelf: "center",
  },
  desc: {
    fontFamily: "Lato-Regular",
    fontSize: moderateScale(16, 0.3),
    textAlign: "center",
    marginBottom: moderateScale(20, 0.3),
  },
  inputStyles: {
    marginVertical: moderateScale(10, 0.3),
    width: "90%",
  },
  fieldsCtn: {
    alignSelf: "center",
    width: "100%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: AppColors.Primary,
    // width: moderateScale(150, 0.3),
    width: "90%",
    marginTop: moderateScale(20, 0.3),
    padding: moderateScale(10, 0.3),
    borderRadius: moderateScale(5),
    justifyContent: "center",
    alignItems: "center",
    borderColor: AppColors.PrimaryDark,
    borderWidth: 1,
  },
  btnTxt: {
    color: AppColors.White,
    fontFamily: "Lato-Regular",
  },
  forgotBtnCtn: {
    marginVertical: moderateScale(20, 0.3),
  },
  forgotBtn: {
    fontFamily: "Lato-Regular",
    color: AppColors.Primary,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bar: {
    backgroundColor: AppColors.Black,
    height: moderateScale(1, 0.3),
    width: "40%",
  },
  googleBtn: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: AppColors.White,
    borderColor: AppColors.Black,
    borderWidth: 1,
    width: "57%",
    height: moderateScale(50, 0.3),
    padding: moderateScale(5, 0.3),
    borderRadius: moderateScale(50),
    marginVertical: moderateVerticalScale(10, 0.3),
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  googleIconCtn: {
    alignSelf: "flex-start",
    width: "30%",
  },
  googleIcon: {
    width: "100%",
    height: "100%",
  },
  googleBtnTxt: {
    fontFamily: "Lato-Regular",
    fontSize: moderateScale(14, 0.1),
    fontWeight: "600",
  },
  signUpTxt: {
    fontFamily: "Lato-Bold",
    fontSize: moderateScale(14, 0.3),
    alignSelf: "center",
    marginBottom: moderateScale(20, 0.3),
    fontWeight: "650",
  },
  errorTxt: {
    color: "red",
    width: "100%",
    textAlign: "right",
    paddingHorizontal: moderateScale(20),
    top: -10,
  },
});

export default styles;
