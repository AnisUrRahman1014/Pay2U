import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { Theme } from "../../../libs";
import { AppColors } from "../../../utils/Global";

const styles = StyleSheet.create({
  containerStyle: {
    height: '90%',
    padding: moderateScale(10),
  },
  itemsContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  chooseFrom:{
    backgroundColor: Theme.colors.MidGrey4,
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(20),
    margin: moderateScale(5),
    borderRadius: moderateScale(200)
  },
  chosenItem:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Theme.colors.MidGrey5,
    paddingVertical: moderateScale(5),
    paddingHorizontal: moderateScale(20),
    margin: moderateScale(5),
    borderRadius: moderateScale(200)
  },
  text:{
    fontFamily: 'Lato-Regular',
    fontSize: moderateScale(14, 0.3)
  },
  separator:{
    width: '90%',
    alignSelf: 'center',
    height: moderateScale(0.5),
    backgroundColor: AppColors.iconColor,
    marginVertical: moderateScale(20)
  },
  btn:{
    width: moderateScale(100),
    margin: 0
  },
  btnsCtn:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(5),
    marginTop: moderateScale(10)
  }
});

export default styles;
