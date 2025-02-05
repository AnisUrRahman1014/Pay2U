import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  headerCtn: {
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(10, 0.3),
  },
});

export default styles;
