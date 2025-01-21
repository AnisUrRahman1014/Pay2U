import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/HomeStack/Home/Home";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/persistSlice";

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setUser(null));
    }, 5000);
  }, []);
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStack;
