import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Feather from "react-native-vector-icons/Feather";

export default function ShowEye({
  onPress,
  activeName,
  notActiveName,
  show,
  style,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ position: "absolute", zIndex: 99, right: 10 }}
    >
      <Text
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: 12,
        }}
      >
        <Feather size={20} name={show ? activeName : notActiveName} />
      </Text>
    </TouchableOpacity>
  );
}
