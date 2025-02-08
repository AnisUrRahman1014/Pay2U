import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { AppColors } from "../../utils/Global";
import { Theme } from "../../libs";

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(10),
    backgroundColor: Theme.colors.MidGrey3,
    width: "100%",
    padding: moderateScale(5),
    marginVertical: moderateScale(2),
    borderRadius: moderateScale(4),
  },
  label: {
    fontFamily: "Lato-Regular",
    fontSize: moderateScale(12),
    width: '55%',
},
price: {
    fontFamily: "Lato-Regular",
    fontSize: moderateScale(12),
    width: '20%'
  },
});

export default styles;
