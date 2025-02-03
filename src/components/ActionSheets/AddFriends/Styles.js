import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { AppColors } from "../../../utils/Global";

const styles = StyleSheet.create({
  containerStyle: {
    height: moderateVerticalScale(250),
    padding: moderateScale(10),
  },
  inputStyles: {
      marginVertical: moderateScale(10, 0.3),
      width: "90%",
    },
    fieldsCtn: {
      alignSelf: "center",
      width: "100%",
      alignItems: "center",
    },
    btn: {
      backgroundColor: AppColors.Primary,
      // width: moderateScale(150, 0.3),
      width: "90%",
      marginTop: moderateScale(20, 0.3),
      padding: moderateScale(10, 0.3),
      borderRadius: moderateScale(5),
      justifyContent: "center",
      alignItems: "center",
      borderColor: AppColors.PrimaryDark,
      borderWidth: 1,
    },
    btnTxt: {
      color: AppColors.White,
      fontFamily: "Lato-Regular",
    },
    errorTxt: {
      color: "red",
      width: "100%",
      textAlign: "right",
      paddingHorizontal: moderateScale(20),
      top: -10,
    },
});

export default styles;
