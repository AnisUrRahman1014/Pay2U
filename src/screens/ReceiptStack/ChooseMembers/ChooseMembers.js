import { View, Text, SafeAreaView, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import GeneralHeader from "../../../components/Headers/GeneralHeader/GeneralHeader";
import ContactViewCard from "../../../components/ContactViewCard/ContactViewCard";
import { showError, showSuccess } from "../../../utils/MessageHandlers";
import {
  getChatRoomIdForFriend,
  getFriendsChatRoomDocForUser,
  getFriendsDocForUser,
  getGroupChatRoomsDocForUser,
} from "../../../services/queries";
import { addReceiptToChatRoom } from "../../../services/mutations";
import { CommonActions } from "@react-navigation/native";
import HeadingText from "../../../components/HeadingText/HeadingText";

const ChooseMembers = (props) => {
  const { navigation } = props;
  const { receipt } = props?.route?.params;
  const [friends, setFriends] = useState([]);
  const [groups, setGroups] = useState([]);
  // console.log(JSON.stringify(receipt, null, 1));

  useEffect(() => {
    getUserFriends();
    getGroupChats();
  }, []);

  const getUserFriends = async () => {
    try {
      const newFriends = await getFriendsChatRoomDocForUser();
      setFriends(newFriends);
    } catch (error) {
      showError("Something went wrong: ".concat(error.message));
      console.log("ERRORS", error);
    }
  };

  const getGroupChats = async () => {
    try {
      const groupChats = await getGroupChatRoomsDocForUser();
      setGroups(groupChats);
    } catch (error) {
      showError("Something went wrong: ".concat(error.message));
      console.log("ERRORS", error);
    }
  };

  const openChatRoom = async (data, type) => {
    try {
      let roomId;
      if (type === "friend") {
        roomId = await getChatRoomIdForFriend(data.userId);
      } else {
        roomId = data?.id;
      }
      Alert.alert("Confirmation", "Add receipt to chat room?", [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Confirm",
          onPress: async () => {
            const response = await addReceiptToChatRoom(roomId, receipt);
            if (response?.success) {
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
              showSuccess(response.message);
            }
          },
        },
      ]);
    } catch (error) {
      showError("Error accessing chat room: ".concat(error.message));
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <GeneralHeader header={"Choose participants"} />
      <ScrollView style={styles.container}>
        <HeadingText heading={"Groups"} headingIndex={1.8} />
        {groups.map((group, index) => {
          return (
            <ContactViewCard
              key={index}
              data={group}
              onPress={() => openChatRoom(group, "group")}
            />
          );
        })}
        <HeadingText heading={"Friends"} headingIndex={1.8} />
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChooseMembers;
