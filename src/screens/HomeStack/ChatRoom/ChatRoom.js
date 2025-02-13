import { View, Text, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import ChatRoomHeader from "../../../components/Headers/ChatRoomHeader/ChatRoomHeader";
import { showError } from "../../../utils/MessageHandlers";
import firestore from "@react-native-firebase/firestore";
import { FirebaseContants } from "../../../utils/Global";
import ReceiptCard from "../../../components/ReceiptCard/ReceiptCard";
import { AppIcons } from "../../../libs";
import { moderateScale } from "react-native-size-matters";

const ChatRoom = (props) => {
  const { navigation } = props;
  const { roomId, friend, navigatedFrom, group } = props?.route?.params; // State to store chat room data
  const [receipts, setReceipts] = useState([]); // State for receipts (if needed)
  const [totalMembers, setTotalMembers] = useState(0);

  const flatListRef = React.useRef(null);

  useEffect(() => {
    // Set up a real-time listener for the chat room document
    const unsubscribe = firestore()
      .collection(FirebaseContants.chats)
      .doc(roomId)
      .onSnapshot(
        (snapshot) => {
          if (snapshot.exists) {
            // Update the chat room state with the latest data
            const chatRoomData = snapshot.data();
            setReceipts(chatRoomData?.receipts);
            setTotalMembers(chatRoomData?.users?.length || 0);
          } else {
            showError("Chat room not found");
          }
        },
        (error) => {
          showError("Error listening to chat room: ".concat(error.message));
        }
      );
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [roomId]);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [receipts]);
  return (
    <SafeAreaView style={styles.rootContainer}>
      <ChatRoomHeader
        title={friend?.userName || group?.name}
        leftIconOnPress={() => {
          navigation.goBack();
        }}
      />
      {receipts?.length > 0 ? (
        <FlatList
          ref={flatListRef}
          data={receipts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ReceiptCard
                key={index}
                receiptData={item}
                chatId={roomId}
                totalMembers={totalMembers}
              />
            );
          }}
          // onContentSizeChange={() => {
          //   // Scroll to the bottom whenever the content size changes
          //   flatListRef.current?.scrollToEnd({ animated: true });
          // }}
          // onLayout={() => {
          //   // Scroll to the bottom whenever the layout changes
          //   flatListRef.current?.scrollToEnd({ animated: true });
          // }}
        />
      ) : (
        <View style={styles.noReceiptCtn}>
          <AppIcons.Nothing size={moderateScale(150)} />
          <Text style={styles.noReceiptTxt}>No receipts available yet</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ChatRoom;
