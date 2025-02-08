import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { FirebaseContants } from "../utils/Global";
import "react-native-get-random-values";
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
    throw Error(error);
  }
};

export const payFirst = async (chatId, receiptId) => {
  try {
    const userId = auth().currentUser.uid;

    // Validate inputs
    if (!chatId || !receiptId) {
      throw Error("ChatId or ReceiptId is missing");
    }

    // Get the chat room document
    const chatRoomRef = firestore()
      .collection(FirebaseContants.chats)
      .doc(chatId);
    const chatRoomDoc = await chatRoomRef.get();

    if (!chatRoomDoc.exists) {
      throw Error("Chat room not found in DB");
    }

    const chatRoomData = chatRoomDoc.data();
    const receipts = chatRoomData.receipts || [];

    // Find the chosen receipt
    const chosenReceiptIndex = receipts.findIndex(
      (receipt) => receipt.id === receiptId
    );

    if (chosenReceiptIndex === -1) {
      throw Error("Receipt not found in this chat room");
    }

    // Update the chosen receipt
    const updatedReceipt = {
      ...receipts[chosenReceiptIndex],
      paidBy: userId, // Set the paidBy field to the current user's ID
    };

    // Update the receipts array
    const updatedReceipts = [...receipts];
    updatedReceipts[chosenReceiptIndex] = updatedReceipt;

    // Update the Firestore document
    await chatRoomRef.update({
      receipts: updatedReceipts,
    });

    console.log("Receipt updated successfully");
    return { success: true, message: "Receipt updated successfully" };
  } catch (error) {
    console.error("Error updating receipt:", error);
    throw Error(error);
  }
};

export const finalizeItems = async (chatId, receiptId, orderedItems) => {
  try {
    const userId = auth().currentUser.uid;

    // Validate inputs
    if (!chatId || !receiptId) {
      throw Error("ChatId or ReceiptId is missing");
    }

    // Validate orderedItems
    if (!Array.isArray(orderedItems) || orderedItems.length === 0) {
      throw Error("Ordered items must be a non-empty array");
    }

    // Validate each item in orderedItems
    for (const item of orderedItems) {
      if (!item.itemName || !item.price) {
        throw Error("Each item must have an itemName and price");
      }
    }

    // Get the chat room document
    const chatRoomRef = firestore()
      .collection(FirebaseContants.chats)
      .doc(chatId);
    const chatRoomDoc = await chatRoomRef.get();

    if (!chatRoomDoc.exists) {
      throw Error("Chat room not found in DB");
    }

    const chatRoomData = chatRoomDoc.data();
    const receipts = chatRoomData.receipts || [];

    // Find the chosen receipt
    const chosenReceiptIndex = receipts.findIndex(
      (receipt) => receipt.id === receiptId
    );

    if (chosenReceiptIndex === -1) {
      throw Error("Receipt not found in this chat room");
    }

    const chosenReceipt = receipts[chosenReceiptIndex];
    const userItems = chosenReceipt.userItems || [];

    // Check if the user already has an entry in userItems
    const userItemIndex = userItems.findIndex(
      (userItem) => userItem.userId === userId
    );

    let updatedUserItems;

    if (userItemIndex !== -1) {
      // Update the existing user's orderedItems
      updatedUserItems = [...userItems];
      updatedUserItems[userItemIndex] = {
        ...updatedUserItems[userItemIndex],
        orderedItems,
      };
    } else {
      // Add a new entry for the user
      updatedUserItems = [
        ...userItems,
        {
          userId: userId,
          orderedItems,
        },
      ];
    }

    // Update the chosen receipt
    const updatedReceipt = {
      ...chosenReceipt,
      userItems: updatedUserItems,
    };

    // Update the receipts array
    const updatedReceipts = [...receipts];
    updatedReceipts[chosenReceiptIndex] = updatedReceipt;

    // Update the Firestore document
    await chatRoomRef.update({
      receipts: updatedReceipts,
    });

    console.log("Receipt updated successfully");
    return { success: true, message: "Receipt updated successfully" };
  } catch (error) {
    console.error("Error updating receipt:", error);
    throw Error(error);
  }
};