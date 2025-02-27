import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./Styles";
import Images from "../../../assets/images";
import { moderateScale } from "react-native-size-matters";
import { AppColors, formateDate } from "../../utils/Global";
import { AppIcons } from "../../libs";

const ContactViewCard = ({ data, isFriendCard, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconCtn}>
        {data?.groupIcon ? (
          <Image
            source={{ uri: data?.groupIcon }}
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
          data?.profilePic ? (
            <Image
              source={{ uri: data?.profilePic }}
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
          ) : (
            <AppIcons.UserIcon
              size={moderateScale(30)}
              color={AppColors.White}
              style={styles.dummyIconBG}
              disabled
            />
          )
        ) : (
          <AppIcons.GroupDummyIcon
            size={moderateScale(30)}
            color={AppColors.White}
            style={styles.dummyIconBG}
            disabled
          />
        )}
      </View>
      <View style={styles.contentCtn}>
        <Text style={styles.heading}>{data?.name || data?.userName}</Text>
        {!isFriendCard && (
          <Text style={styles.desc}>Members: {data?.users?.length}</Text>
        )}
        <Text style={styles.dues}>
          Dues Status: {data?.dues > 0 ? "Pending" : "Cleared"}
        </Text>
        <Text style={styles.dues}>
          Last update:{" "}
          {data?.chatData?.updatedAt
            ? formateDate(data?.chatData?.updatedAt, "withTime")
            : data?.updatedAt
            ? formateDate(data?.updatedAt, "withTime")
            : "Never"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContactViewCard;
