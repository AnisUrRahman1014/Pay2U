import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ActionSheet from "react-native-actions-sheet";
import styles from "./Styles";
import HeadingText from "../../HeadingText/HeadingText";
import { AppIcons } from "../../../libs";
import { moderateScale } from "react-native-size-matters";
import { AppColors } from "../../../utils/Global";
import CustomButton from "../../CustomButton/CustomButton";
import ItemModificationField from "../../ItemModificationField/ItemModificationField";
import { showError } from "../../../utils/MessageHandlers";

const ExtractedItemsForm = ({ formRef, extractedData, setItems, items }) => {
  const [extractedItems, setExtractedItems] = useState(extractedData);
  const [chosenItems, setChosenItems] = useState([]);

  // Add an item to the chosenItems list
  const moveToChosen = (item) => {
    let alreadyExists = false;
    chosenItems.forEach((chosenItem) => {
      if (!chosenItem.itemName == item) {
        alreadyExists = true;
      }
    });
    if (!alreadyExists) {
      const itemObj = {
        itemName: item,
        price: null,
      };
      setChosenItems([...chosenItems, itemObj]);
      setExtractedItems(
        extractedItems.filter((chosenItem) => chosenItem !== item)
      );
    }
  };

  // Remove an item from the chosenItems list
  const removeFromChosen = (item) => {
    setChosenItems(
      chosenItems.filter((chosenItem) => chosenItem.itemName !== item)
    );
    setExtractedItems([...extractedItems, item]);
  };

  // Reset everything and hide the ActionSheet
  const handleDiscard = () => {
    setExtractedItems(extractedData); // Reset extractedItems to initial data
    setChosenItems([]); // Clear chosenItems
    formRef.current?.hide(); // Hide the ActionSheet
  };

  const handleItemUpdate = (index, updatedItem) => {
    const updatedChosenItems = [...chosenItems];
    updatedChosenItems[index] = updatedItem; // Update the specific item
    setChosenItems(updatedChosenItems); // Update the parent state
  };

  const handleSubmit = () => {
    // Filter out invalid items
    const validItems = chosenItems.filter(
      (item) => item?.price && item?.price !== "" && item?.itemName !== ""
    );

    if(chosenItems.length !== validItems.length){
      showError('Please complete all fields');
      return;
    }

    // Filter out duplicate items
    const nonDuplicateItems = validItems.filter(
      (item) =>
        !items.some((existingItem) => existingItem.itemName === item.itemName)
    );

    // Add valid and non-duplicate items to the items list
    if (nonDuplicateItems.length > 0) {
      setItems((prevItems) => [...prevItems, ...nonDuplicateItems]);
      setChosenItems([]); // Clear chosenItems
      formRef.current?.hide(); // Hide the ActionSheet
    }
  };

  return (
    <ActionSheet ref={formRef} containerStyle={styles.containerStyle}>
      <View style={styles.btnsCtn}>
        <CustomButton
          label={"Done"}
          containerStyles={styles.btn}
          focusBtn
          onPress={handleSubmit}
        />
        <AppIcons.CrossIcon size={moderateScale(30)} onPress={handleDiscard} />
      </View>
      <HeadingText
        heading={"Choose the items you want to add"}
        headingIndex={2.5}
      />

      {/* <TouchableOpacity
                style={styles.chosenItem}
                onPress={() => moveToChosen(item)}
                key={index}
              >
                <AppIcons.CrossIcon
                  size={moderateScale(20)}
                  color={AppColors.White}
                  onPress={() => removeFromChosen(item)}
                />
                <Text style={[styles.text, { color: AppColors.White }]}>
                  {item}
                </Text>
              </TouchableOpacity> */}
      <ScrollView>
        <View style={styles.itemsContainer}>
          {chosenItems.map((item, index) => {
            return (
              <ItemModificationField
                item={item}
                key={index}
                onUpdate={(updatedItem) => handleItemUpdate(index, updatedItem)}
                removeFromChosen={removeFromChosen}
              />
            );
          })}
        </View>
        {chosenItems.length > 0 && <View style={styles.separator} />}
        <View style={styles.itemsContainer}>
          {extractedItems.map((item, index) => {
            return (
              <TouchableOpacity
                style={styles.chooseFrom}
                onPress={() => moveToChosen(item)}
                key={index}
              >
                <Text style={styles.text}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </ActionSheet>
  );
};

export default ExtractedItemsForm;
