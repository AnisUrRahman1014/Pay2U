import { StyleSheet } from "react-native";
import { AppColors } from "../../../utils/Global";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColors.White,
  },
  logoutBtn: {
    position: "absolute",
    bottom: 0,
    width: "90%",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    padding: moderateScale(10),
  },
  dpCtn: {
    backgroundColor: AppColors.iconColor,
    alignSelf: "center",
    width: "30%",
    aspectRatio: 1,
    borderRadius: moderateScale(200),
    alignItems: "center",
    justifyContent: "center",
  },
  fieldsCtn: {
    alignSelf: "center",
    width: "100%",
    alignItems: "center",
  },
  inputStyles: {
    fontFamily: "Lato-Regular",
    marginVertical: moderateScale(10, 0.3),
    width: "90%",
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
