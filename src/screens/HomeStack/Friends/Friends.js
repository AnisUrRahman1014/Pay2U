import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useState } from "react";
import ContactViewCard from "../../../components/ContactViewCard/ContactViewCard";
import styles from "./Styles";
import HeadingText from "../../../components/HeadingText/HeadingText";
import { AppIcons } from "../../../libs";
import { AppColors } from "../../../utils/Global";

const Friends = () => {
  const [friends, setFriends] = useState([
    {
      name: "Honeydew",
      members: 6,
      updatedAt: new Date().toISOString(),
      dues: "Pending",
    },
    {
      name: "Kiwi",
      members: 4,
      updatedAt: new Date().toISOString(),
      dues: "Cleared",
    },
    {
      name: "Lemon",
      members: 10,
      updatedAt: new Date().toISOString(),
      dues: "Pending",
    },
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HeadingText
          heading={"Friends"}
          headingIndex={1.5}
          icon={() => (
            <AppIcons.AddIcon
              size={25}
              color={AppColors.White}
              style={styles.icon}
            />
          )}
        />
        {friends.map((friend, index) => {
          return <ContactViewCard key={index} data={friend} isFriendCard />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Friends;
