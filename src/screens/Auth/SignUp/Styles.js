import {
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import { AppColors } from "../../../utils/Global";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: moderateScale(10),
    backgroundColor: AppColors.White,
  },
  logoCtn: {
    height: moderateVerticalScale(150),
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
  errorTxt: {
    color: "red",
    width: "100%",
    textAlign: "right",
    paddingHorizontal: moderateScale(20),
    top: -10,
  },
});

export default styles;
