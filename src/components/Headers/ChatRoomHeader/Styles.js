import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { AppColors } from "../../../utils/Global";

const styles = StyleSheet.create({
    header:{
        height: '100%',
        height: moderateVerticalScale(40),
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: moderateScale(10),
        backgroundColor: AppColors.Primary
    },
    title:{
        color: AppColors.White,
        fontFamily:'Lato-Bold',
        fontSize: moderateScale(18, 0.3),
    }
});

export default styles;