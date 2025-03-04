import React, { useEffect } from "react";
import AppNavigation from "./src/navigation";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { persistor, store } from "./src/redux/store";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  const [loaded, error] = useFonts({
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Thin": require("./assets/fonts/Lato-Thin.ttf"),
    "Lato-Light": require("./assets/fonts/Lato-Light.ttf"),
  });

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AlertNotificationRoot>
          <GestureHandlerRootView>
            <AppNavigation />
          </GestureHandlerRootView>
        </AlertNotificationRoot>
      </PersistGate>
    </Provider>
  );
}
