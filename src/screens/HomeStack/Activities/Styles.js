import { StyleSheet } from "react-native";
import { AppColors } from "../../../utils/Global";
import { moderateScale } from "react-native-size-matters";
import { Theme } from "../../../libs";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColors.White,
    padding: moderateScale(10),
  },
  activityCard: {
    backgroundColor: Theme.colors.MidGrey1,
    width: '100%',
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
    marginVertical: moderateScale(10)
  },
  message:{
    fontFamily: 'Lato-Regular',
    fontSize: moderateScale(16),
  },
  time:{
    fontFamily: 'Lato-Regular',
    fontSize: moderateScale(12),
    textAlign: 'right',
    marginTop: moderateScale(10),
    color: AppColors.iconColor
  }
});

export default styles;
