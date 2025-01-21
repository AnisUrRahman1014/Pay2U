import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import { useSelector } from "react-redux";
import HomeStack from "./HomeStack";

const AppNavigation = () => {
  const user = useSelector((state) => state?.persistSlice?.user);
  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;
