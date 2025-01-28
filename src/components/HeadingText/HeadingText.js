import React from "react";
import { View, Text } from "react-native";
import styles from "./Styles";

const HeadingText = ({ heading, headingIndex }) => {
  return <Text style={styles.headingTxt(headingIndex)}>{heading}</Text>;
};

export default HeadingText;
