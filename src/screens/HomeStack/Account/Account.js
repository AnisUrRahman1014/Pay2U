import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/slices/persistSlice";
import auth from '@react-native-firebase/auth'
import { showError } from "../../../utils/MessageHandlers";

const Account = () => {
  const dispatch = useDispatch();
  const handleLogout = async()=> {
    try{

      await auth().signOut();
      dispatch(logoutUser(null));
    }catch(error){
      showError(error.message)
    }
  }
  return (
    <View>
      <CustomButton label={'Logout'} onPress={handleLogout}/>
    </View>
  );
};

export default Account;
