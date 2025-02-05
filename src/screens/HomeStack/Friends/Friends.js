import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ContactViewCard from "../../../components/ContactViewCard/ContactViewCard";
import styles from "./Styles";
import HeadingText from "../../../components/HeadingText/HeadingText";
import { AppIcons } from "../../../libs";
import { AppColors } from "../../../utils/Global";
import AddFriendForm from "../../../components/ActionSheets/AddFriends/AddFriendForm";
import { useSelector } from "react-redux";
import { showError } from "../../../utils/MessageHandlers";
import { getCurrentUserFromDB, getFriendsDocForUser } from "../../../services/queries";

const Friends = () => {
  const currentUser = useSelector(state => state?.persistSlice?.user);
  const userId = currentUser?.uid;
  const addFriendFormRef = useRef(null);
  const [friends, setFriends] = useState([
    {
      name: "Honeydew",
      updatedAt: new Date().toISOString(),
      dues: "Pending",
    },
    {
      name: "Kiwi",
      updatedAt: new Date().toISOString(),
      dues: "Cleared",
    },
    {
      name: "Lemon",
      updatedAt: new Date().toISOString(),
      dues: "Pending",
    },
  ]);

  // Get user's friends
  useEffect(()=>{
    getUserFriends();
  },[])

  const getUserFriends = async()=> {
    try{
      // GET FRIENDS
      const newFriends = await getFriendsDocForUser();
      const updatedNewFriendsDoc = newFriends.map(friend => {
        return{
          ...friend,
          updatedAt: new Date().toISOString(),
        }
      })
      console.log(updatedNewFriendsDoc)
      setFriends([
        ...friends,
       ...updatedNewFriendsDoc
      ])
    }catch(error){
      showError('Something went wrong | Getting friends')
      console.log('ERRORS', error)
    }
  }

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
              onPress={()=> addFriendFormRef.current.show()}
            />
          )}
        />
        {friends.map((friend, index) => {
          return <ContactViewCard key={index} data={friend} isFriendCard />;
        })}
      </ScrollView>
      <AddFriendForm formRef={addFriendFormRef}/>
    </SafeAreaView>
  );
};

export default Friends;
