import { StyleSheet } from "react-native";
import { Theme } from "../../libs";
import { moderateScale } from "react-native-size-matters";
import { AppColors } from "../../utils/Global";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Theme.colors.MidGrey4,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(20),
    paddingVertical: moderateScale(10),
    paddingLeft: moderateScale(5),
    paddingRight: moderateScale(12),
  },
  dpFlex: {
    alignItems: "flex-start",
    padding: moderateScale(10),
  },
  dpContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(200),
  },
  dp: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    borderRadius: moderateScale(200)
  },
  receiptCtn: {
    flex: 1,
  },
  btn:{
    backgroundColor: AppColors.Primary
  },
  btnTxt:{
    color: AppColors.White
  },
  status:{
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center'
  },
  label:{
    fontFamily: 'Lato-Bold',
    fontSize: moderateScale(14),
    textTransform: 'uppercase'
  }
});

export default styles;
