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
    padding: moderateScale(20),
  },
  summaryCtn: {
    flexDirection: "row",
    backgroundColor: AppColors.Primary,
    marginVertical: moderateVerticalScale(30),
    height: moderateVerticalScale(150),
    borderRadius: moderateScale(20),
    padding: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  leftCtn: {
    flex: 0.4,
    width: "100%",
    height: "100%",
    alignSelf: "center",
    backgroundColor: "red",
  },
  rightCtn: {
    flex: 0.6,
    width: "100%",
    height: "100%",
    backgroundColor: "blue",
  },
});

export default styles;
