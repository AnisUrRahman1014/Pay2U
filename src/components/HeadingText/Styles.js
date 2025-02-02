import { StyleSheet } from "react-native";
import {
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import { AppColors } from "../../utils/Global";

const styles = StyleSheet.create({
  headingTxt: (index) => ({
    fontSize: moderateScale(44 / index, 0.3),
    fontFamily: "Lato-Regular",
    fontWeight: "600",
    marginVertical: moderateVerticalScale(10),
    color: AppColors.Black
  }),
  viewAll:{
    fontSize: moderateScale(14, 0.3),
    fontFamily: "Lato-Regular",
    fontWeight: "600",
    marginVertical: moderateVerticalScale(10),
    color: AppColors.iconColor
  },
  rowCtn:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default styles;
