import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ContactViewCard from "../../../components/ContactViewCard/ContactViewCard";
import styles from "./Styles";
import HeadingText from "../../../components/HeadingText/HeadingText";
import { AppIcons } from "../../../libs";
import { AppColors } from "../../../utils/Global";
import AddFriendForm from "../../../components/ActionSheets/AddFriends/AddFriendForm";
import { useSelector } from "react-redux";
import { showError } from "../../../utils/MessageHandlers";
import {
  getChatRoomIdForFriend,
  getCurrentUserFromDB,
  getFriendsChatRoomDocForUser,
  getFriendsDocForUser,
} from "../../../services/queries";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const Friends = () => {
  const navigation = useNavigation();
  const addFriendFormRef = useRef(null);
  const [friends, setFriends] = useState([]);

  // Get user's friends
  useFocusEffect(useCallback(() => {
    getUserFriends();
  }, []));

  const getUserFriends = async () => {
    try {
      // GET FRIENDS
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
      navigation.navigate("ChatRoom", {
        roomId,
        friend,
      });
    } catch (error) {
      showError("Error accessing chat room: ".concat(error.message));
    }
  };

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
              onPress={() => addFriendFormRef.current.show()}
            />
          )}
        />
        {friends?.length > 0 ? (
          friends.map((friend, index) => {
            return (
              <ContactViewCard
                key={index}
                data={friend}
                isFriendCard
                onPress={() => openChatRoom(friend)}
              />
            );
          })
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={styles.label}>No users found</Text>
          </View>
        )}
      </ScrollView>
      <AddFriendForm formRef={addFriendFormRef} />
    </SafeAreaView>
  );
};

export default Friends;
