import { View, Text } from "react-native";
import React from "react";
import styles from "./Styles";
import { AppIcons } from "../../../libs";
import { moderateScale } from "react-native-size-matters";
import { AppColors } from "../../../utils/Global";
import { useNavigation } from "@react-navigation/native";

const ChatRoomHeader = ({ title, rightComp }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <AppIcons.BackIcon1
        size={moderateScale(20)}
        color={AppColors.White}
        style={{
          marginHorizontal: moderateScale(5),
          width: 50,
        }}
        onPress={()=>navigation.goBack()}
      />
      <Text style={styles.title}>{title}</Text>
      {rightComp && rightComp()}
    </View>
  );
};

export default ChatRoomHeader;
