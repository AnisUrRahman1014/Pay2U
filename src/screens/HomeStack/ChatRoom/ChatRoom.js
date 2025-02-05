import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import ChatRoomHeader from "../../../components/Headers/ChatRoomHeader/ChatRoomHeader";
import { showError } from "../../../utils/MessageHandlers";
import firestore from '@react-native-firebase/firestore'
import { FirebaseContants } from "../../../utils/Global";

const ChatRoom = (props) => {
  const { roomId, friend } = props?.route?.params; // State to store chat room data
  const [receipts, setReceipts] = useState([]); // State for receipts (if needed)

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
            setReceipts(
                chatRoomData?.receipts
            )
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

  return (
    <SafeAreaView style={styles.rootContainer}>
      <ChatRoomHeader title={friend?.userName} />
    </SafeAreaView>
  );
};

export default ChatRoom;
