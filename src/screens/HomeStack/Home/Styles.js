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
    paddingHorizontal: moderateScale(20),
  },
  summaryCtn: {
    flexDirection: "row",
    backgroundColor: AppColors.Primary,
    marginVertical: moderateVerticalScale(30),
    height: moderateVerticalScale(150),
    borderRadius: moderateScale(20),
    padding: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  leftCtn: {
    flex: 0.4,
    width: "100%",
    height: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  rightCtn: {
    flex: 0.6,
    width: "100%",
    height: "100%",
    justifyContent: "space-evenly",
    padding: moderateScale(10),
  },
  container: {
    width: "100%",
    padding: moderateScale(5),
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: moderateVerticalScale(10),
  },
  addBtn: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: AppColors.Primary,
    width: moderateScale(70),
    aspectRatio: 1,
    borderRadius: moderateScale(250),
    zIndex: 10,
    elevation: 10,
  },
  pieChart: {
    alignSelf: "center",
  },
  balance: {
    fontFamily: "Lato-Regular",
    color: AppColors.White,
    textAlign: "center",
    fontSize: moderateScale(32, 0.3),
  },
  credit: {
    fontFamily: "Lato-Regular",
    color: AppColors.error,
    textAlign: "center",
    fontSize: moderateScale(20, 0.3),
  },
  debit: {
    fontFamily: "Lato-Regular",
    color: AppColors.PrimaryDark,
    textAlign: "center",
    fontSize: moderateScale(26, 0.3),
  },
  emptyTxt: {
    fontFamily: 'Lato-Bold',
    fontSize: moderateScale(16, 0.3),
    color: AppColors.error
  }
});

export default styles;
