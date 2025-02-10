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
} from "../../../services/queries";
import { addReceiptToChatRoom } from "../../../services/mutations";
import { CommonActions } from "@react-navigation/native";

const ChooseMembers = (props) => {
  const { navigation } = props;
  const { receipt } = props?.route?.params;
  const [friends, setFriends] = useState([]);
  // console.log(JSON.stringify(receipt, null, 1));

  useEffect(() => {
    getUserFriends();
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

  const openChatRoom = async (friend) => {
    try {
      let roomId = await getChatRoomIdForFriend(friend.userId);
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
              navigation.navigate("ChatRoom", {
                roomId,
                friend,
                navigatedFrom: 'receiptStack'
              });
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
        {friends.map((friend, index) => {
          return (
            <ContactViewCard
              key={index}
              data={friend}
              isFriendCard
              onPress={() => openChatRoom(friend)}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChooseMembers;
