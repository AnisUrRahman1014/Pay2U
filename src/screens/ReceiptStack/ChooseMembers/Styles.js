import { StyleSheet } from "react-native";
import { AppColors } from "../../../utils/Global";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColors.White,
  },
  container: {
    padding: moderateScale(10),
  },
  emptyTxt: {
    fontFamily: "Lato-Bold",
    fontSize: moderateScale(16, 0.3),
    color: AppColors.error,
    alignSelf: 'center'
  },
});

export default styles;
