import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/slices/persistSlice";

const Account = () => {
  const dispatch = useDispatch();
  const handleLogout = ()=> {
    dispatch(logoutUser(null));
  }
  return (
    <View>
      <CustomButton label={'Logout'} onPress={handleLogout}/>
    </View>
  );
};

export default Account;
