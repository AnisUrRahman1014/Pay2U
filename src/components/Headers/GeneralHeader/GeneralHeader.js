import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "./Styles";
import { AppIcons } from "../../../libs";
import { AppColors } from "../../../utils/Global";

const GeneralHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerCtn}>
      <AppIcons.BackIcon1
        size={30}
        color={AppColors.iconColor}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default GeneralHeader;
