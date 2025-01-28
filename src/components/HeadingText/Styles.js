import { StyleSheet } from "react-native";
import {
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";

const styles = StyleSheet.create({
  headingTxt: (index) => ({
    fontSize: moderateScale(44 / index, 0.3),
    fontFamily: "Lato-Regular",
    fontWeight: "600",
    marginVertical: moderateVerticalScale(10),
  }),
});

export default styles;
