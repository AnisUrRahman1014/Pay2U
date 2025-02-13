import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { FirebaseContants } from "../utils/Global";

// User
export const getCurrentUserFromDB = async () => {
  try {
    const userId = auth().currentUser.uid;
    if (!userId) {
      throw Error("Can't get user id from the auth");
    }
    const documentRef = await firestore()
      .collection(FirebaseContants.users)
      .doc(userId)
      .get();
    if (!documentRef) {
      throw Error("No document found for user");
    }
    const userData = documentRef.data();
    return userData;
  } catch (error) {
    console.log("Error getting current user ", error);
    throw Error(error);
  }
};

export const getFriendsChatRoomDocForUser = async () => {
  try {
    const userId = auth().currentUser.uid;

    if (!userId) {
      throw Error("Can't get user id from the auth");
    }
    const documentRef = await firestore()
      .collection(FirebaseContants.users)
      .doc(userId)
      .get();
    if (!documentRef) {
      throw Error("No document found for user");
    }
    const userData = documentRef.data();
    const friendIds = userData.friends || [];
    const friendDocs = [];
    console.log(friendIds);

    for (friendID of friendIds) {
      const friendDocRef = await firestore()
        .collection(FirebaseContants.users)
        .doc(friendID)
        .get();
      if (friendDocRef.exists) {
        friendDocs.push({
          ...friendDocRef.data(), // Friend's user data
          chatData: null, // Placeholder for chat data
        });
      }
    }

    const chatQuerySnapshot = await firestore()
      .collection(FirebaseContants.chats)
      .where("type", "==", "friends")
      .where("users", "array-contains", userId)
      .get();

    // If documents are found, filter them to include only those where the users array also contains the friend ID
    if (!chatQuerySnapshot.empty) {
      chatQuerySnapshot.forEach((doc) => {
        const chatData = doc.data();
        const users = chatData.users || [];

        // Find the friend ID in the users array (excluding the current user ID)
        const friendId = users.find((id) => id !== userId);

        // Find the corresponding friend document in friendDocs
        const friendDoc = friendDocs.find((doc) => doc.userId === friendId);

        // If a matching friend document is found, merge the chat data
        if (friendDoc) {
          friendDoc.chatData = chatData;
        }
      });
    }
    return friendDocs;
  } catch (error) {
    console.log("Error getting current user ", error);
    throw Error(error);
  }
};

export const getRecentFriendsChatRoomDocForUser = async () => {
  try {
    const userId = auth().currentUser.uid;

    if (!userId) {
      throw Error("Can't get user id from the auth");
    }

    const documentRef = await firestore()
      .collection(FirebaseContants.users)
      .doc(userId)
      .get();
    if (!documentRef.exists) {
      throw Error("No document found for user");
    }

    const userData = documentRef.data();
    const friendIds = userData.friends || [];
    const friendDocs = [];
    console.log(friendIds);

    // Step 1: Fetch friends' documents
    for (const friendID of friendIds) {
      const friendDocRef = await firestore()
        .collection(FirebaseContants.users)
        .doc(friendID)
        .get();
      if (friendDocRef.exists) {
        friendDocs.push({
          ...friendDocRef.data(), // Friend's user data
          chatData: null, // Placeholder for chat data
        });
      }
    }

    // Step 2: Query the chat rooms where the current user is a member and type is "friends"
    const chatQuerySnapshot = await firestore()
      .collection(FirebaseContants.chats)
      .where("type", "==", "friends")
      .where("users", "array-contains", userId)
      .orderBy("updatedAt", "desc") // Order by updatedAt descending
      .limit(3) // Limit to the 3 most recent chats
      .get();

    // Step 3: If chat documents are found, filter them by user and add chat data to the respective friend
    if (!chatQuerySnapshot.empty) {
      chatQuerySnapshot.forEach((doc) => {
        const chatData = doc.data();
        const users = chatData.users || [];

        // Find the friend ID in the users array (excluding the current user ID)
        const friendId = users.find((id) => id !== userId);

        // Find the corresponding friend document in friendDocs
        const friendDoc = friendDocs.find((doc) => doc.userId === friendId);

        // If a matching friend document is found, merge the chat data
        if (friendDoc) {
          friendDoc.chatData = chatData;
        }
      });
    }

    return friendDocs;
  } catch (error) {
    console.log("Error getting friends' chat rooms: ", error);
    throw Error(error);
  }
};

export const getFriendsDocForUser = async () => {
  try {
    const userId = auth().currentUser.uid;
    if (!userId) {
      throw Error("Can't get user id from the auth");
    }
    const documentRef = await firestore()
      .collection(FirebaseContants.users)
      .doc(userId)
      .get();
    if (!documentRef) {
      throw Error("No document found for user");
    }
    const userData = documentRef.data();
    const friendIds = userData.friends || [];
    const friendDocs = [];
    for (friendID of friendIds) {
      const friendDocRef = await firestore()
        .collection(FirebaseContants.users)
        .doc(friendID)
        .get();
      friendDocs.push(friendDocRef.data());
    }
    return friendDocs;
  } catch (error) {
    console.log("Error getting current user ", error);
    throw Error(error);
  }
};

export const getUserById = async (userId) => {
  try {
    if (!userId) {
      throw Error("User Id required");
    }
    const documentRef = await firestore()
      .collection(FirebaseContants.users)
      .doc(userId)
      .get();
    if (!documentRef) {
      throw Error("No document found for user");
    }
    const userData = documentRef.data();
    return userData;
  } catch (error) {
    console.log("Error getting current user ", error);
    throw Error(error);
  }
};

export const getActivitiesForUser = async () => {
  try {
    const userId = auth().currentUser.uid;
    if (!userId) {
      throw Error("Can't get user id from the auth");
    }
    const documentRef = await firestore()
      .collection(FirebaseContants.users)
      .doc(userId)
      .get();
    if (!documentRef) {
      throw Error("No document found for user");
    }
    const userData = documentRef.data();
    const activities = userData.activities || [];
    const sortedActivities = activities?.sort((a, b) => {
      const dateA = new Date(a.createdAt); // Convert to Date object
      const dateB = new Date(b.createdAt); // Convert to Date object
      return dateB - dateA; // Sort in descending order
    });

    return sortedActivities;
  } catch (error) {
    throw Error(error);
  }
};

// Chat Rooms
export const getChatRoomIdForFriend = async (friendId) => {
  try {
    // Step 1: Get the current user's ID
    const userId = auth().currentUser.uid;
    if (!userId) {
      throw Error("Can't get user ID from the auth");
    }

    // Step 2: Get the current user's document
    const userDocRef = await firestore()
      .collection(FirebaseContants.users)
      .doc(userId)
      .get();

    if (!userDocRef.exists) {
      throw Error("No document found for the current user");
    }

    // Step 3: Extract chatRoomIds from the user's document
    const userData = userDocRef.data();
    const chatRoomIds = userData?.chatRoomIds || [];

    if (chatRoomIds.length === 0) {
      throw Error("No chat rooms found for the current user");
    }

    // Step 4: Check each chat room in the chats collection
    for (const chatRoomId of chatRoomIds) {
      const chatDocRef = await firestore()
        .collection(FirebaseContants.chats)
        .doc(chatRoomId)
        .get();

      if (!chatDocRef.exists) {
        console.warn(`Chat room ${chatRoomId} does not exist`);
        continue;
      }

      const chatData = chatDocRef.data();

      // Step 5: Check if the chat room has both the current user and the friend in the "users" array
      // and if the "type" is 'friends'
      if (
        chatData?.users?.includes(userId) &&
        chatData?.users?.includes(friendId) &&
        chatData?.type === "friends"
      ) {
        return chatRoomId; // Return the matching chat room ID
      }
    }

    // Step 6: If no matching chat room is found, throw an error
    throw Error("No chat room found with the specified friend");
  } catch (error) {
    console.error("Error in getChatRoomIdForFriend:", error.message);
    throw Error(error.message); // Re-throw the error for further handling
  }
};

export const getChatRoomfromDB = async (roomId) => {
  try {
    // Step 1: Validate the roomId
    if (!roomId || typeof roomId !== "string") {
      throw Error("Invalid room ID provided");
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

    // Step 4: Return the chat room data
    return chatDocRef.data();
  } catch (error) {
    console.error("Error in getChatRoom:", error.message);
    throw Error(error.message); // Re-throw the error for further handling
  }
};

// Groups
export const getGroupChatRoomsDocForUser = async () => {
  try {
    const userId = auth().currentUser.uid;

    if (!userId) {
      throw Error("Can't get user id from the auth");
    }
    const documentRef = await firestore()
      .collection(FirebaseContants.users)
      .doc(userId)
      .get();
    if (!documentRef) {
      throw Error("No document found for user");
    }

    const groupChats = [];

    const chatQuerySnapshot = await firestore()
      .collection(FirebaseContants.chats)
      .where("type", "==", "group")
      .where("users", "array-contains", userId)
      .get();

    // If documents are found, filter them to include only those where the users array also contains the friend ID
    if (!chatQuerySnapshot.empty) {
      chatQuerySnapshot.forEach((doc) => {
        const chatData = doc.data();
        groupChats.push(chatData);
      });
    }
    return groupChats;
  } catch (error) {
    console.log("Error getting current user ", error);
    throw Error(error);
  }
};

export const getRecentGroupChats = async () => {
  try {
    const userId = auth().currentUser.uid;

    if (!userId) {
      throw Error("Can't get user id from the auth");
    }
    const documentRef = await firestore()
      .collection(FirebaseContants.users)
      .doc(userId)
      .get();
    if (!documentRef) {
      throw Error("No document found for user");
    }

    const groupChats = [];

    const chatQuerySnapshot = await firestore()
      .collection(FirebaseContants.chats)
      .where("type", "==", "group")
      .where("users", "array-contains", userId)
      .orderBy("updatedAt", "desc") // Order by updatedAt descending
      .limit(3) // Limit to the 3 most recent
      .get();

    // If documents are found, filter them to include only those where the users array also contains the friend ID
    if (!chatQuerySnapshot.empty) {
      chatQuerySnapshot.forEach((doc) => {
        const chatData = doc.data();
        groupChats.push(chatData);
      });
    }
    return groupChats;
  } catch (error) {
    console.log("Error getting current user ", error);
    throw Error(error);
  }
};
