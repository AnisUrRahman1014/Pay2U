import { StyleSheet } from "react-native";
import { AppColors } from "../../../utils/Global";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: AppColors.White,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    marginVertical: moderateScale(3),
    width: "95%",
    alignSelf: "center",
    borderWidth: moderateScale(1),
  },
  itemText: {
    fontFamily: "Lato-Regular",
    marginLeft: moderateScale(10),
    fontSize: moderateScale(16),
  },
  confirmButton: {
    bottom: 0,
    backgroundColor: AppColors.Primary,
    padding: moderateScale(15),
    borderRadius: moderateScale(5),
    alignItems: "center",
    margin: moderateScale(20),
  },
  confirmButtonText: {
    fontFamily: "Lato-Bold",
    color: AppColors.White,
    fontSize: moderateScale(16),
  },
  container: {
    padding: moderateScale(10),
    flex: 1
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
