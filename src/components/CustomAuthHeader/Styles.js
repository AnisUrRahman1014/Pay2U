import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { AppColors, AppFonts } from "../../utils/Global";

const styles = StyleSheet.create({
  container: {
    width: "28%",
    padding: moderateScale(5, 0.3),
    backgroundColor: AppColors.Primary,
    flexDirection: "row",
    gap: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(10),
    borderColor: AppColors.PrimaryDark,
    borderWidth: 1,
  },
  circle: {
    backgroundColor: AppColors.White,
    width: "30%",
    aspectRatio: 1,
    borderRadius: moderateScale(400),
    borderColor: AppColors.PrimaryDark,
    borderWidth: 1,
  },
  title: {
    fontFamily: AppFonts.LatoRegular,
    color: AppColors.White,
  },
});

export default styles;
