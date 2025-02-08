import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: moderateScale(2),
    width: "95%",
    alignItems: "center",
    marginVertical: moderateScale(2)
  },
  title: {
    fontFamily: "Lato-Bold",
    fontSize: moderateScale(12),
  },
  desc: {
    fontFamily: "Lato-Regular",
    fontSize: moderateScale(12),
  },
});

export default styles;
