import { View, Text } from "react-native";
import React, { useState } from "react";
import styles from "./Styles";
import NativeInput from "../NativeInput/NativeInput";
import { AppIcons, Theme } from "../../libs";
import { moderateScale } from "react-native-size-matters";

const ItemModificationField = ({ item, onUpdate, removeFromChosen }) => {
  const [itemName, setItemName] = useState(item?.itemName);
  const [price, setPrice] = useState(item?.price || "");
  // Handle changes in the item name or price
  const handleTextChange = (val, type) => {
    if (type === "name") {
      setItemName(val);
      onUpdate({ itemName: val, price });
    } else if (type === "price") {
      // Ensure the value is a valid number
      const numericValue = val.replace(/[^0-9.]/g, ""); // Remove non-numeric characters
      setPrice(numericValue);
      onUpdate({ itemName, price: numericValue });
    }
  };
  return (
    <View style={styles.container}>
    <AppIcons.CrossIcon size={moderateScale(20)} color={Theme.colors.white} onPress={()=>removeFromChosen(item?.itemName)}/>
      <NativeInput
        simpleTxtInp
        value={itemName}
        onChangeText={(text) => handleTextChange(text, "name")}
        containerStyle={styles.containerStyle}
        inputStyle={styles.inputStyles}
      />
      <NativeInput
        simpleTxtInp
        value={price}
        onChangeText={(text) => handleTextChange(text, "price")}
        keyboardType='numeric'
        containerStyle={[styles.containerStyle, {width: '25%'}]}
        inputStyle={styles.inputStyles}
      />
    </View>
  );
};

export default ItemModificationField;
