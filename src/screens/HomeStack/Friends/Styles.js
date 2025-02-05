import { StyleSheet } from "react-native";
import { AppColors } from "../../../utils/Global";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.White,
    padding: moderateScale(10),
  },
  icon: {
    borderRadius: moderateScale(200),
    width: moderateScale(30),
    aspectRatio: 1,
    backgroundColor: AppColors.Primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  label:{
    fontFamily: 'Lato-Regular',
    fontSize: moderateScale(18, 0.3),
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});

export default styles;
