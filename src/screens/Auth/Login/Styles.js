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
  },
});

export default styles;
