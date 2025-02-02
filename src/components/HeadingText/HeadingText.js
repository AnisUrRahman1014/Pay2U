import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./Styles";

const HeadingText = ({ heading, headingIndex, viewAll, onPressViewAll, icon, onPressIcon }) => {
  if (viewAll) {
    return (
      <View style={styles.rowCtn}>
        <Text style={styles.headingTxt(headingIndex)}>{heading}</Text>
        <TouchableOpacity onPress={onPressViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
    );
  }else if(icon){
    return (
      <View style={styles.rowCtn}>
        <Text style={styles.headingTxt(headingIndex)}>{heading}</Text>
        {icon && icon()}
      </View>
    )
  } else return <Text style={styles.headingTxt(headingIndex)}>{heading}</Text>;
};

export default HeadingText;
