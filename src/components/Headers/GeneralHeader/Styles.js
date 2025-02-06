import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  headerCtn: {
    flexDirection: 'row',
    paddingVertical: moderateScale(20),
    paddingLeft: moderateScale(10, 0.3),
    paddingRight: moderateScale(20, 0.3),
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header:{
    fontFamily: 'Lato-Bold',
    fontSize: moderateScale(18, 0.3),
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  rowCtn:{
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default styles;
