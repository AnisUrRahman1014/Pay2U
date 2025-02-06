import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "./Styles";
import { AppIcons } from "../../../libs";
import { AppColors } from "../../../utils/Global";
import { moderateScale } from "react-native-size-matters";

const GeneralHeader = ({ header, rightComp }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerCtn}>
      <View style={styles.rowCtn}>
        <AppIcons.BackIcon1
          size={moderateScale(25)}
          color={AppColors.iconColor}
          onPress={() => navigation.goBack()}
        />
        {header && <Text style={styles.header}>{header}</Text>}
      </View>
      {rightComp && rightComp()}
    </View>
  );
};

export default GeneralHeader;
