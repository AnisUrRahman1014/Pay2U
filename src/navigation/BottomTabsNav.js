import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AccountStack,
  ActivityStack,
  FriendsStack,
  GroupsStack,
  HomeStack,
} from "./StackNavigator";
import { AppIcons } from "../libs";
import { moderateScale } from "react-native-size-matters";
import { AppColors } from "../utils/Global";

const BottomTabs = createBottomTabNavigator();

const BottomTabsNav = () => {
  const tabs = [
    {
      name: "HomeStack",
      component: HomeStack,
      icons: {
        activeIcon: (color) => (
          <AppIcons.HomeIconActive
            size={moderateScale(20)}
            color={color}
            disabled
          />
        ),
      },
    },
    {
      name: "FriendsStack",
      component: FriendsStack,
      icons: {
        activeIcon: (color) => (
          <AppIcons.FriendsIconActive
            size={moderateScale(20)}
            color={color}
            disabled
          />
        ),
      },
    },
    {
      name: "GroupsStack",
      component: GroupsStack,
      icons: {
        activeIcon: (color) => (
          <AppIcons.GroupsIconActive
            size={moderateScale(20)}
            color={color}
            disabled
          />
        ), // Replace with your actual active icon
      },
    },
    {
      name: "ActivityStack",
      component: ActivityStack,
      icons: {
        activeIcon: (color) => (
          <AppIcons.ActiveIconActive
            size={moderateScale(20)}
            color={color}
            disabled
          />
        ), // Replace with your actual active icon
      },
    },
    {
      name: "AccountStack",
      component: AccountStack,
      icons: {
        activeIcon: (color) => (
          <AppIcons.AccountActiveIcon
            size={moderateScale(20)}
            color={color}
            disabled
          />
        ), // Replace with your actual active icon
      },
    },
  ];

  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: AppColors.PrimaryDark,
        tabBarInactiveTintColor: AppColors.iconColor,
      }}
    >
      {tabs.map((tab) => (
        <BottomTabs.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ focused, color }) => tab.icons.activeIcon(color),
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
      ))}
    </BottomTabs.Navigator>
  );
};

export default BottomTabsNav;
