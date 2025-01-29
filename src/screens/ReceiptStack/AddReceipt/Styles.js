import { StyleSheet } from "react-native";
import { AppColors } from "../../../utils/Global";
import {
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.White,
    flex: 1,
  },
  headerCtn: {
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(10, 0.3),
  },
  container: {
    flex: 1,
  },
  imageCtn: {
    marginTop: moderateVerticalScale(10, 0.3),
    height: "40%",
    aspectRatio: 3 / 4,
    alignSelf: "center",
    borderRadius: moderateScale(10),
    borderColor: AppColors.iconColor,
    borderWidth: moderateScale(1),
  },
  separatorCtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  separator: {
    width: "40%",
    backgroundColor: AppColors.iconColor,
    height: moderateScale(1, 0.3),
  },
  desc: {
    fontFamily: "Lato-Bold",
    color: AppColors.iconColor,
    fontSize: moderateScale(14, 0.3),
  },
});

export default styles;
