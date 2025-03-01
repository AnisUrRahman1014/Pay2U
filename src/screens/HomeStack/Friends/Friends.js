import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import ContactViewCard from "../../../components/ContactViewCard/ContactViewCard";
import styles from "./Styles";
import HeadingText from "../../../components/HeadingText/HeadingText";
import { AppIcons } from "../../../libs";
import { AppColors } from "../../../utils/Global";
import AddFriendForm from "../../../components/ActionSheets/AddFriends/AddFriendForm";
import { showError } from "../../../utils/MessageHandlers";
import { getFriendsChatRoomDocForUser, getChatRoomIdForFriend } from "../../../services/queries";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const Friends = () => {
  const navigation = useNavigation();
  const addFriendFormRef = useRef(null);
  const [friends, setFriends] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State for refresh control

  // Fetch user's friends
  const getUserFriends = async () => {
    try {
      const newFriends = await getFriendsChatRoomDocForUser();
      setFriends(newFriends);
    } catch (error) {
      showError("Something went wrong: ".concat(error.message));
      console.log("ERRORS", error);
    } finally {
      setRefreshing(false); // Stop the refreshing indicator
    }
  };

  // Refresh function
  const onRefresh = useCallback(() => {
    setRefreshing(true); // Start the refreshing indicator
    getUserFriends(); // Fetch data again
  }, []);

  // Fetch data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      getUserFriends();
    }, [])
  );

  // Open chat room
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
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing} // Bind refreshing state
            onRefresh={onRefresh} // Bind refresh function
            colors={[AppColors.Primary]} // Customize the refresh indicator color
          />
        }
      >
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
        <FlatList
          data={friends}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.label}>No users found</Text>
              </View>
            );
          }}
          renderItem={({ item, index }) => {
            return (
              <ContactViewCard
                key={index}
                data={item}
                isFriendCard
                onPress={() => openChatRoom(item)}
              />
            );
          }}
        />
      </ScrollView>
      <AddFriendForm formRef={addFriendFormRef} />
    </SafeAreaView>
  );
};

export default Friends;