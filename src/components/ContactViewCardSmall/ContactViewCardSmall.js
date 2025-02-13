import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Images from "../../../assets/images";
import { moderateScale } from "react-native-size-matters";
import { AppColors } from "../../utils/Global";
import { AppIcons } from "../../libs";
import styles from "./Styles";
import Checkbox from "expo-checkbox";

const ContactViewCardSmall = ({ data, isFriendCard, onPress, isSelected }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Checkbox
        style={{ alignSelf: "center", marginHorizontal: moderateScale(5) }}
        value={isSelected}
        onValueChange={onPress}
      />
      <View style={styles.iconCtn}>
      {data?.groupIcon ? (
          <Image
            source={Images.Pay2ULogo}
            style={{
              width: "80%",
              height: "80%",
              borderRadius: moderateScale(200),
              backgroundColor: AppColors.White,
              borderWidth: 1,
              borderColor: AppColors.Primary,
            }}
            resizeMode="contain"
          />
        ) : isFriendCard ? (
          <AppIcons.UserIcon
            size={moderateScale(20)}
            color={AppColors.White}
            style={styles.dummyIconBG}
            disabled
          />
        ) : (
          <AppIcons.GroupDummyIcon
            size={moderateScale(20)}
            color={AppColors.White}
            style={styles.dummyIconBG}
            disabled
          />
        )}
      </View>
      <View style={styles.contentCtn}>
        <Text style={styles.heading}>{data?.name || data?.userName}</Text>
        {!isFriendCard && (
          <Text style={styles.desc}>Members: {data?.members}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ContactViewCardSmall;