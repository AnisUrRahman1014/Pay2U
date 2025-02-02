import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppColors } from "../../../utils/Global";
import styles from "./Styles";
import HeadingText from "../../../components/HeadingText/HeadingText";
import { AppIcons } from "../../../libs";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import ContactViewCard from "../../../components/ContactViewCard/ContactViewCard";
import PieChart from "react-native-pie-chart";

const Home = () => {
  const navigation = useNavigation();
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
  const series = [
    { value: 230, color: "#fbd203", label: { text: "Balance" } },
    { value: 210, color: "#ffb300", label: { text: "Debit" } },
    { value: 30, color: "#ff9100", label: { text: "Credit" } },
  ];

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCtn}>
          <View style={styles.leftCtn}>
            <PieChart
              widthAndHeight={moderateScale(110)}
              series={series}
              style={styles.pieChart}
            />
          </View>
          <View style={styles.rightCtn}>
            <Text style={styles.balance}>$230.00</Text>
            <Text style={styles.debit}>$210.00</Text>
            <Text style={styles.credit}>$30.00</Text>
          </View>
        </View>

        <HeadingText
          heading="Groups"
          headingIndex={2}
          viewAll
          onPressViewAll={() => navigation.navigate("GroupsStack")}
        />
        <View style={styles.container}>
          {groups.map((group, index) => {
            return <ContactViewCard key={index} data={group} />;
          })}
        </View>

        <HeadingText
          heading="Individuals"
          headingIndex={2}
          viewAll
          onPressViewAll={() => navigation.navigate("FriendsStack")}
        />
        <View style={styles.container}>
          {friends.map((group, index) => {
            return <ContactViewCard key={index} data={group} isFriendCard />;
          })}
        </View>
      </ScrollView>
      <AppIcons.CameraIcon
        size={moderateScale(35)}
        color={AppColors.White}
        style={styles.addBtn}
        onPress={() => navigation.navigate("ReceiptStack")}
      />
    </SafeAreaView>
  );
};

export default Home;
