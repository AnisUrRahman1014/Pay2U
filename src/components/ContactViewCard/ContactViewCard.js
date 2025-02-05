import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./Styles";
import Images from "../../../assets/images";
import { moderateScale } from "react-native-size-matters";
import { AppColors } from "../../utils/Global";
import { AppIcons } from "../../libs";

const ContactViewCard = ({ data, isFriendCard, onPress }) => {
  const formateDate = (dateString) => {
    // Create a Date object from the input string
    const date = new Date(dateString);

    // Options for formatting the date
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    // Format the date using Intl.DateTimeFormat
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    return formattedDate;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
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
          <Text style={styles.desc}>Members: {data?.members}</Text>
        )}
        <Text style={styles.dues}>
          Dues Status: {data?.dues > 0 ? "Pending" : "Cleared"}
        </Text>
        <Text style={styles.dues}>
          Last update:{" "}
          {data?.updatedAt ? formateDate(data?.updatedAt) : "Never"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ContactViewCard;
