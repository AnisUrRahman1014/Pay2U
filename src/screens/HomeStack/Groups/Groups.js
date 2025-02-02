import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeadingText from "../../../components/HeadingText/HeadingText";
import styles from "./Styles";
import ContactViewCard from "../../../components/ContactViewCard/ContactViewCard";
import { AppIcons } from "../../../libs";
import { AppColors } from "../../../utils/Global";

const Groups = () => {
  const [groups, setGroups] = useState([
    {
      name: "Apple",
      members: 5,
      updatedAt: new Date().toISOString(),
      dues: "Cleared",
    },
    {
      name: "Banana",
      members: 8,
      updatedAt: new Date().toISOString(),
      dues: "Pending",
    },
    {
      name: "Cherry",
      members: 12,
      updatedAt: new Date().toISOString(),
      dues: "Cleared",
    },
  ]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <HeadingText
          heading={"Groups"}
          headingIndex={1.5}
          icon={() => (
            <AppIcons.AddIcon
              size={25}
              color={AppColors.White}
              style={styles.icon}
            />
          )}
        />
        {groups.map((friend, index) => {
          return <ContactViewCard key={index} data={friend} isFriendCard />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Groups;
