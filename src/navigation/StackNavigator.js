import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/HomeStack/Home/Home";
import Friends from "../screens/HomeStack/Friends/Friends";
import Groups from "../screens/HomeStack/Groups/Groups";
import Activities from "../screens/HomeStack/Activities/Activities";
import Account from "../screens/HomeStack/Account/Account";
import AddReceipt from "../screens/ReceiptStack/AddReceipt/AddReceipt";
import ChatRoom from "../screens/HomeStack/ChatRoom/ChatRoom";
import ConfirmReceipt from "../screens/ReceiptStack/ConfirmReceipt/ConfirmReceipt";
import ChooseMembers from "../screens/ReceiptStack/ChooseMembers/ChooseMembers";

const Stack = createNativeStackNavigator();
export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export const FriendsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Friends" component={Friends} />
    </Stack.Navigator>
  );
};

export const GroupsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Groups" component={Groups} />
    </Stack.Navigator>
  );
};

export const ActivityStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Activities" component={Activities} />
    </Stack.Navigator>
  );
};

export const AccountStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
};

export const ReceiptStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AddReceipt" component={AddReceipt} />
      <Stack.Screen name="ConfirmReceipt" component={ConfirmReceipt}/>
      <Stack.Screen name="ChooseMembers" component={ChooseMembers}/>
    </Stack.Navigator>
  );
};
