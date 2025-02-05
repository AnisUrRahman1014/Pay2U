import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { useSelector } from "react-redux";
import BottomTabsNav from "./BottomTabsNav";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatRoom from "../screens/HomeStack/ChatRoom/ChatRoom";
const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  const user = useSelector((state) => state?.persistSlice?.user);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="BottomTabsNav" component={BottomTabsNav} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
        
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
