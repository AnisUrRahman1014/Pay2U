import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppColors } from "../../../utils/Global";
import styles from "./Styles";
import HeadingText from "../../../components/HeadingText/HeadingText";
import { AppIcons } from "../../../libs";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import ContactViewCard from "../../../components/ContactViewCard/ContactViewCard";
import PieChart from "react-native-pie-chart";
import { showError } from "../../../utils/MessageHandlers";
import { getCurrentUserFromDB } from "../../../services/queries";

const Home = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
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
  
  useEffect(()=>{
    getUser();
  },[])
  
  const getUser= async()=>{
    try{
      const user = await getCurrentUserFromDB();
      setUser(user);
    }catch(error){
      showError('Error getting user '.concat(error.message))
    }
  }
  
  const series = [
    { value: user?.balance, color: "#fbd203", label: { text: "Balance" } },
    { value: user?.debit, color: "#ffb300", label: { text: "Debit" } },
    { value: user?.credit, color: "#ff9100", label: { text: "Credit" } },
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
            <Text style={styles.balance}>${user?.balance}</Text>
            <Text style={styles.debit}>${user?.debit}</Text>
            <Text style={styles.credit}>${user?.credit}</Text>
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
