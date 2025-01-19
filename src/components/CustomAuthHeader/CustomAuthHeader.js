import { View, Text } from "react-native";
import React from "react";
import styles from "./Styles";

const CustomAuthHeader = ({ title }) => {
  return (
    <View style={styles.container}>
      <>
        {title === "Login" && <View style={styles.circle} />}
        <Text style={styles.title}>{title}</Text>
        {title === "Sign up" && <View style={styles.circle} />}
      </>
    </View>
  );
};

export default CustomAuthHeader;
