import { StyleSheet } from "react-native";
import { AppColors } from "../../../utils/Global";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: AppColors.White,
  },
  noReceiptCtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noReceiptTxt:{
    marginTop: moderateScale(50),
    fontFamily: 'Lato-Bold',
    fontSize: moderateScale(18,0.3),
    color: AppColors.iconColor
  }
});

export default styles;
