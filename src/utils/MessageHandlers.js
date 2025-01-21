import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export const showSuccess = (message) => {
  Toast.show({
    type: ALERT_TYPE.SUCCESS,
    title: "Success",
    textBody: message,
  });
};

export const showWarning = (message) => {
  Toast.show({
    type: ALERT_TYPE.WARNING,
    title: "Warning",
    textBody: message,
  });
};

export const showError = (message) => {
  Toast.show({
    type: ALERT_TYPE.DANGER,
    title: "Error",
    textBody: message,
  });
};

export const showInfo = (message) => {
  Toast.show({
    type: ALERT_TYPE.INFO,
    title: "Info",
    textBody: message,
  });
};
