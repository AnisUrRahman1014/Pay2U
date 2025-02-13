import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppColors } from "../../../utils/Global";
import styles from "./Styles";
import HeadingText from "../../../components/HeadingText/HeadingText";
import { AppIcons } from "../../../libs";
import { moderateScale } from "react-native-size-matters";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ContactViewCard from "../../../components/ContactViewCard/ContactViewCard";
import PieChart from "react-native-pie-chart";
import { showError, showSuccess } from "../../../utils/MessageHandlers";
import {
  getChatRoomIdForFriend,
  getCurrentUserFromDB,
  getRecentFriendsChatRoomDocForUser,
  getRecentGroupChats,
} from "../../../services/queries";

const Home = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [friends, setFriends] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getUser();
      getRecentFriends();
      getRecentGroups();
    }, [])
  );

  const getUser = async () => {
    try {
      const user = await getCurrentUserFromDB();
      setUser(user);
    } catch (error) {
      showError("Error getting user ".concat(error.message));
    }
  };

  const getRecentGroups = async () => {
    try {
      const chats = await getRecentGroupChats();
      setGroups(chats);
    } catch (error) {
      showError("Failed to get recent groups. ".concat(error.message));
    }
  };

  const getRecentFriends = async () => {
    try {
      const friendss = await getRecentFriendsChatRoomDocForUser();
      setFriends(friendss);
    } catch (error) {
      showError("Failed to get recent friends. ".concat(error.message));
    }
  };

  const series = [
    {
      value: user?.balance
        ? user?.balance > 0
          ? user?.balance
          : user?.balance * -1
        : 100,
      color: "#fbd203",
    },
    {
      value: user?.debit
        ? user?.debit > 0
          ? user?.debit
          : user?.debit * -1
        : 0,
      color: "#ffb300",
    },
    {
      value: user?.credit
        ? user?.credit > 0
          ? user?.credit
          : user?.credit * -1
        : 0,
      color: "#ff9100",
    },
  ];

  const openChatRoom = async (data, type) => {
    try {
      let roomId;
      if (type === "friend") {
        roomId = await getChatRoomIdForFriend(data.userId);
      } else {
        roomId = data?.id;
      }
      if (type === "friend") {
        navigation.navigate("ChatRoom", {
          roomId,
          friend: data,
          navigatedFrom: "receiptStack",
        });
      } else {
        navigation.navigate("ChatRoom", {
          roomId,
          group: data,
          navigatedFrom: "receiptStack",
        });
      }
    } catch (error) {
      showError("Error accessing chat room: ".concat(error.message));
    }
  };

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
            <Text style={styles.balance}>$ {user?.balance || "---"}</Text>
            <Text style={styles.debit}>$ {user?.debit || "---"}</Text>
            <Text style={styles.credit}>$ {user?.credit || "---"}</Text>
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
            return <ContactViewCard key={index} data={group} onPress={() => openChatRoom(group, "group")}/>;
          })}
        </View>

        <HeadingText
          heading="Individuals"
          headingIndex={2}
          viewAll
          onPressViewAll={() => navigation.navigate("FriendsStack")}
        />
        <View style={styles.container}>
          {friends.map((friend, index) => {
            return (
              <ContactViewCard
                key={index}
                data={friend}
                isFriendCard
                onPress={() => openChatRoom(friend, "friend")}
              />
            );
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
