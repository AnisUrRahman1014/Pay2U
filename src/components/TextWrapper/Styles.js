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
  title: priority => ({
    fontFamily: "Lato-Bold",
    fontSize: moderateScale(12 * priority),
  }),
  desc: priority => ({
    fontFamily: "Lato-Regular",
    fontSize: moderateScale(12 * priority),
  }),
});

export default styles;
