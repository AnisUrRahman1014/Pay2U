import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { FirebaseContants } from "../utils/Global";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";

export const addReceiptToChatRoom = async (roomId, receipt) => {
  try {
    const userId = auth().currentUser.uid;
    // Step 1: Validate the roomId
    if (!roomId || typeof roomId !== "string") {
      throw Error("Invalid room ID provided");
    }

    // Step 2: Validate the receipt
    if (!receipt || typeof receipt !== "object") {
      throw Error("Invalid receipt provided");
    }

    // Step 2: Get the chat room document from Firestore
    const chatDocRef = await firestore()
      .collection(FirebaseContants.chats)
      .doc(roomId)
      .get();

    // Step 3: Check if the document exists
    if (!chatDocRef.exists) {
      throw Error("Chat room not found");
    }

    const chatRoomData = chatDocRef.data();
    const receipts = chatRoomData.receipts || [];

    const receiptId = uuidv4();

    // Step 6: Add the new receipt to the receipts array
    receipts.push({
      ...receipt,
      createdAt: new Date().toISOString(),
      createdby: userId,
      id: receiptId,
      totalBill: receipt.items.reduce((sum, item) => {
        return sum + Number(item.price);
      }, 0),
    });

    // Step 7: Update the chat room document with the new receipts array
    await firestore().collection(FirebaseContants.chats).doc(roomId).update({
      receipts: receipts,
    });

    console.log("Receipt added successfully to chat room:", roomId);
    return { success: true, message: "Receipt added successfully" };
  } catch (error) {
      console.log(error)
    throw Error(error);
  }
};
