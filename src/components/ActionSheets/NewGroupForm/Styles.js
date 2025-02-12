import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const styles = StyleSheet.create({
  containerStyle: {
    height: "90%",
    padding: moderateScale(10),
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
    marginVertical: moderateScale(10)
  },
  errorTxt: {
    color: "red",
    width: "100%",
    textAlign: "right",
    paddingHorizontal: moderateScale(10),
    top: 5,
  },
});

export default styles;
