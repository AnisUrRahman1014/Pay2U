import { Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./Styles";

const CustomButton = ({
  label,
  containerStyles,
  labelStyles,
  onPress,
  focusBtn = false,
}) => {
  if (focusBtn) {
    return (
      <TouchableOpacity
        style={[styles.button1, containerStyles]}
        onPress={onPress}
      >
        <Text style={[styles.label1, labelStyles]}>{label}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={[styles.button2, containerStyles]}
        onPress={onPress}
      >
        <Text style={[styles.label2, labelStyles]}>{label}</Text>
      </TouchableOpacity>
    );
  }
};

export default CustomButton;
