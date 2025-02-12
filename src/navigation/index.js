import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { useSelector } from "react-redux";
import BottomTabsNav from "./BottomTabsNav";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatRoom from "../screens/HomeStack/ChatRoom/ChatRoom";
import { ReceiptStack } from "./StackNavigator";

const Stack = createNativeStackNavigator();
const navigationRef = React.createRef();

const AppNavigation = () => {
  const user = useSelector((state) => state?.persistSlice?.user);

  useEffect(() => {
    if (!user) {
      // Reset the navigation stack when the user logs out
      navigationRef.current?.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    }
  }, [user]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="BottomTabsNav" component={BottomTabsNav} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        <Stack.Screen name="ReceiptStack" component={ReceiptStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;