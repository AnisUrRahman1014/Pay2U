import { StyleSheet } from "react-native";
import { AppColors } from "../../../utils/Global";
import {
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: AppColors.White,
    flex: 1,
  },
  headerCtn: {
    paddingVertical: moderateScale(20),
    paddingHorizontal: moderateScale(10, 0.3),
  },
  container: {
    flex: 1,
  },
  imageCtn: {
    marginTop: moderateVerticalScale(10, 0.3),
    height: "40%",
    aspectRatio: 3 / 4,
    alignSelf: "center",
    borderRadius: moderateScale(10),
    borderColor: AppColors.iconColor,
    borderWidth: moderateScale(1),
  },
  separatorCtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  separator: {
    width: "40%",
    backgroundColor: AppColors.iconColor,
    height: moderateScale(1, 0.3),
  },
  desc: {
    fontFamily: "Lato-Bold",
    color: AppColors.iconColor,
    fontSize: moderateScale(14, 0.3),
  },
  rowCtn: {
    flexDirection: "row",
    padding: moderateScale(10),
    gap: moderateScale(5),
    alignItems: "top",
    justifyContent: "center",
    height: moderateVerticalScale(80),
  },
  inputStyles: (width) => ({
    width: moderateScale(width),
    alignSelf: "center",
  }),
  errorTxt: {
    color: "red",
    width: "100%",
    textAlign: "right",
    paddingHorizontal: moderateScale(20),
    right: -20,
  },
  itemListCtn: {
    backgroundColor: AppColors.iconColor,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    borderRadius: moderateScale(5),
    marginVertical: moderateVerticalScale(5)
  },
  desc1: {
    color: AppColors.White,
    fontFamily: "Lato-Regular",
    fontSize: moderateScale(16, 0.3),
    width: moderateScale(200),
  },
  desc2: {
    color: AppColors.White,
    fontFamily: "Lato-Bold",
    fontSize: moderateScale(16, 0.3),
  },
  row:{
    flexDirection: "row",
    gap: moderateScale(5),
    alignItems: "top",
    justifyContent: "center",
  }
});

export default styles;
