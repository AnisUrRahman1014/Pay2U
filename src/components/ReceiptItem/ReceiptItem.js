import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import Checkbox from "expo-checkbox";

const ReceiptItem = ({item, onCheck, isDisbled, manualCheck}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(()=>{
    setIsChecked(manualCheck)
  },[manualCheck])

  const toggleCheckBox = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onCheck(item, newCheckedState); // Notify parent component about the change
  };
  return (
    <View style={styles.container}>
      <Checkbox value={isChecked} onValueChange={toggleCheckBox} disabled={isDisbled}/>
      <Text style={styles.label}>{item?.itemName.toUpperCase()}</Text>
      <Text style={styles.price} numberOfLines={2} ellipsizeMode="clip">$ {item?.price}</Text>
    </View>
  );
};

export default ReceiptItem;
