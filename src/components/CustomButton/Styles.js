import { StyleSheet } from "react-native";
import { AppColors } from "../../utils/Global";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  button1: {
    backgroundColor: AppColors.Primary,
    padding: moderateScale(10, 0.3),
    borderRadius: moderateScale(7, 0.3),
    alignItems: "center",
    justifyContent: "center",
    margin: moderateScale(10, 0.3),
  },
  button2: {
    backgroundColor: AppColors.White,
    borderColor: AppColors.iconColor,
    borderWidth: moderateScale(1),
    padding: moderateScale(10, 0.3),
    borderRadius: moderateScale(7, 0.3),
    alignItems: "center",
    justifyContent: "center",
    margin: moderateScale(10, 0.3),
  },
  label1: {
    fontFamily: "Lato-Regular",
    color: AppColors.White,
    fontSize: moderateScale(14, 0.3),
    fontWeight: "700",
  },
  label2: {
    fontFamily: "Lato-Regular",
    color: AppColors.iconColor,
    fontSize: moderateScale(14, 0.3),
    fontWeight: "600",
  },
});

export default styles;
