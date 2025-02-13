import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Theme } from "../../libs";
import { AppColors } from "../../utils/Global";

const styles = StyleSheet.create({
    container:{
        width: '95%',
        alignSelf: 'center',
        flexDirection: 'row',
        padding: moderateScale(5),
        paddingHorizontal: moderateScale(5),
        marginVertical: moderateScale(5),
        justifyContent: 'space-evenly',
        backgroundColor: Theme.colors.MidGrey3,
        gap: 5,
        borderRadius: moderateScale(5)
    },
    containerStyle:{
        width: '65%',
    },
    inputStyles : {
        paddingVertical: moderateScale(2),
        paddingHorizontal: moderateScale(5),
        backgroundColor: AppColors.White,
        fontSize: moderateScale(14)
    }

});

export default styles;