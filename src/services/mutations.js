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

    const subtotal = receipt.items.reduce((sum, item) => {
      return sum + Number(item.price);
    }, 0);

    const taxAmount = (subtotal * receipt.gst) / 100; // Calculate GST amount
    const totalBill = subtotal + taxAmount; // Calculate total bill including GST

    // Step 6: Add the new receipt to the receipts array
    receipts.push({
      ...receipt,
      createdAt: new Date().toISOString(),
      createdby: userId,
      id: receiptId,
      subtotal, // Add subtotal (optional)
      taxAmount, // Add tax amount
      totalBill, // Add total bill including GST
    });

    // Step 7: Update the chat room document with the new receipts array
    await firestore().collection(FirebaseContants.chats).doc(roomId).update({
      receipts: receipts,
      updatedAt: new Date().toISOString(),
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
      updatedAt: new Date().toISOString(),
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

    // // Validate orderedItems
    // if (!Array.isArray(orderedItems) || orderedItems.length === 0) {
    //   throw Error("Ordered items must be a non-empty array");
    // }

    // // Validate each item in orderedItems
    // for (const item of orderedItems) {
    //   if (!item.itemName || !item.price) {
    //     throw Error("Each item must have an itemName and price");
    //   }
    // }

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
      updatedAt: new Date().toISOString(),
    };

    // Check if all the members have finalized their order
    if (updatedReceipt?.userItems?.length === chatRoomData?.users?.length) {
      // Calculate each user's share of the bill
      const items = updatedReceipt.items || [];
      const userItemsWithShare = updatedReceipt.userItems.map((userItem) => {
        let myShare = 0;

        // Iterate through the user's ordered items
        userItem.orderedItems.forEach((orderedItem) => {
          // Find the corresponding item in the receipt's items list
          const item = items.find((i) => i.itemName === orderedItem.itemName);

          if (item) {
            // Calculate the number of users who ordered this item
            const usersWhoOrderedItem = updatedReceipt.userItems.filter((ui) =>
              ui.orderedItems.some((oi) => oi.itemName === orderedItem.itemName)
            ).length;

            // Divide the item's price among the users who ordered it
            myShare += parseFloat(item.price) / usersWhoOrderedItem;
          }
        });
        myShare += updatedReceipt?.taxAmount / chatRoomData?.users?.length;

        // Add the calculated share to the user's object
        return {
          ...userItem,
          myShare: parseFloat(myShare.toFixed(2)), // Round to 2 decimal places
        };
      });

      // Update the receipt with the userItems containing myShare
      updatedReceipt.userItems = userItemsWithShare;

      // Calculate the total amount to be paid to the paidBy user
      const totalBill = userItemsWithShare.reduce(
        (total, userItem) => total + userItem.myShare,
        0
      );

      const totalAmountToPaidByUser = totalBill - userItemsWithShare.filter(user => user.userId === chosenReceipt.paidBy)[0].myShare;

      // Update the paidBy user's debit field
      const paidByUserDocRef = firestore()
        .collection(FirebaseContants.users)
        .doc(chosenReceipt.paidBy);
      const paidByUserDoc = await paidByUserDocRef.get();

      if (!paidByUserDoc.exists) {
        throw Error("PaidBy user not found in DB");
      }

      const paidByUserData = paidByUserDoc.data();
      const updatedDebit =
        (paidByUserData.debit || 0) + totalAmountToPaidByUser;

      await paidByUserDocRef.update({
        debit: updatedDebit,
      });

      // Update each member's credit field
      const updateUserPromises = userItemsWithShare.map(async (userItem) => {
        const userDocRef = firestore()
          .collection(FirebaseContants.users)
          .doc(userItem.userId);
        const userDoc = await userDocRef.get();

        if (!userDoc.exists) {
          throw Error(`User ${userItem.userId} not found in DB`);
        }

        const userData = userDoc.data();
        const currentDebit = userData?.debit || 0;
        const updatedCredit = (userData.credit || 0) + userItem.myShare;

        return userDocRef.update({
          credit: userItem.userId === chosenReceipt.paidBy ? userData?.credit : updatedCredit,
          balance: userItem.userId === chosenReceipt.paidBy ?  currentDebit - userData?.credit : currentDebit - updatedCredit
        });
      });

      // Wait for all user updates to complete
      await Promise.all(updateUserPromises);
    }

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

export const payMyShare = async (chatId, receiptId) => {
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

    const chosenReceipt = receipts[chosenReceiptIndex];
    const userItems = chosenReceipt.userItems || [];

    // Check if the user already has an entry in userItems
    const userItemIndex = userItems.findIndex(
      (userItem) => userItem.userId === userId
    );

    if (userItemIndex === -1) {
      throw Error("Cannot find user in the userItems list");
    }

    const currentUserRecord = userItems[userItemIndex];
    const currentUserShare = currentUserRecord.myShare || 0;

    if (currentUserShare <= 0) {
      throw Error("User's share is not valid or already paid");
    }

    // Get the paidBy user's document
    const paidByUserDocRef = firestore()
      .collection(FirebaseContants.users)
      .doc(chosenReceipt?.paidBy);
    const paidByUserDoc = await paidByUserDocRef.get();

    if (!paidByUserDoc.exists) {
      throw Error("PaidBy user not found in DB");
    }

    const paidByUser = paidByUserDoc.data();
    const paidByUserActivities = paidByUser?.activities || [];
    const paidUserDebit = paidByUser?.debit || 0;
    const paidUserCredit = paidByUser?.credit || 0;

    // Calculate new balance and debit for the paidBy user
    const newDebit = paidUserDebit - currentUserShare;
    const newPaidByUserBalance = newDebit - paidUserCredit;

    // Get the current user's document
    const currentUserDocRef = firestore()
      .collection(FirebaseContants.users)
      .doc(userId);
    const currentUserDoc = await currentUserDocRef.get();

    if (!currentUserDoc.exists) {
      throw Error("Current user not found in DB");
    }

    const currentUserData = currentUserDoc.data();
    const currentUserActivities = currentUserData?.activities || [];
    const currentUserCredit = currentUserData?.credit || 0;
    const currentUserDebit = currentUserData?.debit || 0;

    // Calculate new credit for the current user
    const newCredit = currentUserCredit - currentUserShare;
    const newCurrentUserBalance = currentUserDebit - newCredit;

    const currentUserNewActivity = {
      createdAt: new Date().toISOString(),
      message: `You paid $ ${currentUserShare} to ${paidByUser?.userName}`,
      type: "sent",
    };

    const paidByUserNewActivity = {
      createdAt: new Date().toISOString(),
      message: `${currentUserData?.userName} paid $ ${currentUserShare} to you.`,
      type: "received",
    };

    currentUserActivities.push(currentUserNewActivity);
    paidByUserActivities.push(paidByUserNewActivity);

    // Update the current user's record in userItems
    const updatedUserItems = [...userItems];
    updatedUserItems[userItemIndex] = {
      ...currentUserRecord,
      paid: true,
      paidAt: new Date().toISOString(),
    };

    // Update the chosen receipt
    const updatedReceipt = {
      ...chosenReceipt,
      userItems: updatedUserItems,
      updatedAt: new Date().toISOString(),
    };

    // Update the receipts array
    const updatedReceipts = [...receipts];
    updatedReceipts[chosenReceiptIndex] = updatedReceipt;

    // Use Promise.all to handle concurrent Firestore updates
    await Promise.all([
      // Update the paidBy user's balance and debit
      paidByUserDocRef.update({
        balance: newPaidByUserBalance,
        debit: newDebit,
        activities: paidByUserActivities,
      }),

      // Update the current user's credit
      currentUserDocRef.update({
        balance: newCurrentUserBalance,
        credit: newCredit,
        activities: currentUserActivities,
      }),

      // Update the chat room's receipts array
      chatRoomRef.update({
        receipts: updatedReceipts,
      }),
    ]);

    console.log("Receipt updated successfully");
    return { success: true, message: "Receipt updated successfully" };
  } catch (error) {
    console.error("Error updating receipt:", error);
    throw Error(error);
  }
};

export const createNewGroup = async (groupName, chosenFriends, groupIcon) => {
  try {
    const userId = auth().currentUser.uid;

    // Step 1: Create a new chat room document
    const chatDocRef = firestore().collection(FirebaseContants.chats).doc();
    const chatRoomId = chatDocRef.id;

    // Step 2: Prepare the list of users (current user + chosen friends)
    const users = [userId, ...chosenFriends.map((friend) => friend.userId)];

    // Step 3: Create the chat room document
    await chatDocRef.set({
      id: chatRoomId,
      groupIcon: groupIcon,
      name: groupName, // Add the group name
      users: users, // Add all user IDs
      type: "group", // Specify the type as "group"
      receipts: [], // Initialize receipts
      totalDues: 0, // Initialize total dues
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Step 4: Update the groupChatIds for all users
    const updatePromises = users.map(async (user) => {
      const userDocRef = firestore()
        .collection(FirebaseContants.users)
        .doc(user);
      const userDoc = await userDocRef.get();

      if (!userDoc.exists) {
        console.log(`User ${user} not found in DB`);
        return;
      }

      const userData = userDoc.data();
      const chatRoomIds = userData.chatRoomIds || []; // Use chatRoomIds instead of groupChatIds

      // Add the new chat room ID to the chatRoomIds array
      if (!chatRoomIds.includes(chatRoomId)) {
        chatRoomIds.push(chatRoomId);
      }

      // Update the user document with the updated chatRoomIds
      await userDocRef.update({
        chatRoomIds: chatRoomIds,
      });
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises);

    return { success: true, message: "Group created successfully" };
  } catch (error) {
    console.error("Error creating group:", error);
    throw Error(error);
  }
};

export const updateProfile = async (username, profilePic) => {
  try {
    const user = auth().currentUser;

    if (!user) {
      throw Error("No user is currently signed in.");
    }

    const userId = user.uid;

    // Update Firebase Authentication profile
    const updates = {};
    if (username) {
      updates.displayName = username;
    }
    if (profilePic) {
      updates.photoURL = profilePic;
    }

    await user.updateProfile(updates);

    // Update Firestore profile
    const userDocRef = firestore()
      .collection(FirebaseContants.users)
      .doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      throw Error("User document does not exist in Firestore.");
    }

    const userData = userDoc.data();
    const oldPic = userData?.profilePic || "";
    const oldUsername = userData?.userName || "";

    await userDocRef.update({
      userName: username || oldUsername,
      profilePic: profilePic || oldPic,
      updatedAt: new Date().toISOString(), // Add an updatedAt field
    });

    return {
      success: true,
      user: user,
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    throw Error(error.message || "Failed to update profile");
  }
};
