import { View, Text, ScrollView, FlatList, RefreshControl } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeadingText from "../../../components/HeadingText/HeadingText";
import styles from "./Styles";
import ContactViewCard from "../../../components/ContactViewCard/ContactViewCard";
import { AppIcons } from "../../../libs";
import { AppColors } from "../../../utils/Global";
import NewGroupForm from "../../../components/ActionSheets/NewGroupForm/NewGroupForm";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { showError } from "../../../utils/MessageHandlers";
import { getGroupChatRoomsDocForUser } from "../../../services/queries";

const Groups = () => {
  const navigation = useNavigation();
  const newGroupFormRef = useRef();
  const [groups, setGroups] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State for refresh control

  // Fetch group chats
  const getGroupChats = async () => {
    try {
      const chats = await getGroupChatRoomsDocForUser();
      const sorted = chats.sort((a, b) => {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
      setGroups(sorted);
    } catch (error) {
      showError("Error getting group chats ".concat(error.message));
    } finally {
      setRefreshing(false); // Stop the refreshing indicator
    }
  };

  // Refresh function
  const onRefresh = useCallback(() => {
    setRefreshing(true); // Start the refreshing indicator
    getGroupChats(); // Fetch data again
  }, []);

  // Fetch data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      getGroupChats();
    }, [])
  );

  // Open chat room
  const openChatRoom = async (group) => {
    try {
      let roomId = group.id;
      navigation.navigate("ChatRoom", {
        roomId,
        group,
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
          heading={"Groups"}
          headingIndex={1.5}
          icon={() => (
            <AppIcons.AddIcon
              size={25}
              color={AppColors.White}
              style={styles.icon}
              onPress={() => newGroupFormRef.current.show()}
            />
          )}
        />
        <FlatList
          data={groups}
          renderItem={({ item, index }) => {
            return (
              <ContactViewCard
                key={index}
                data={item}
                onPress={() => openChatRoom(item)}
              />
            );
          }}
        />
      </ScrollView>
      <NewGroupForm formRef={newGroupFormRef} />
    </SafeAreaView>
  );
};

export default Groups;