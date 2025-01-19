// NativeInputStyles.js
import { StyleSheet } from "react-native";
import { Responsive, Theme } from "../../libs";

// import { Theme, Responsive } from "../../libs";
// import { fonts } from '../../assets/fonts';

const { AppFonts, getWidth, getHeight } = Responsive;

const styles = StyleSheet.create({
  errorText: {
    color: Theme.colors.error,
    marginLeft: getWidth(5),
    marginTop: getHeight(0.1),
    fontSize: AppFonts.t3,
  },

  imgLogo: {
    height: getHeight(3.2),
    width: getHeight(3.2),
    left: getWidth(3),
  },
  imgSmLogo: {
    height: getHeight(3.2),
    width: getHeight(3.2),
    aspectRatio: 1,
    left: getWidth(3),
  },
  setWidthImg: {
    height: "100%",
    width: "100%",
  },
  inputContainer: {
    borderRadius: Theme.borders.normalRadius,
    backgroundColor: Theme.colors.white,
    width: getWidth(93),
    background: "red",
  },
  inputContainerPlain: {
    borderRadius: Theme.borders.normalRadius,
    backgroundColor: Theme.colors.WizardWhite,
    width: getWidth(93),
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.MidnightMosaic,
  },
  inputSmContainer: {
    borderRadius: Theme.borders.normalRadius,
    backgroundColor: Theme.colors.white,
    width: getWidth(80),
  },
  inputSm: {
    borderColor: "gray",
    color: Theme.colors.text,
    fontSize: AppFonts.t2,
    left: getWidth(4.5),
    // fontFamily:  fonts.regular,
    paddingTop: getHeight(2),
  },
  flexSmRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    fontSize: AppFonts.t2,
    width: "100%",
    backgroundColor: Theme.colors.white,
  },
  theme: {
    primary: "#007AFF",
    background: "white",
  },
  inputPlain: {
    color: Theme.colors.text,
    fontSize: AppFonts.t1,
    paddingVertical: -5,
    paddingLeft: getWidth(0),
    paddingTop: getHeight(0.5),
    width: "100%",
  },
});
export default styles;
