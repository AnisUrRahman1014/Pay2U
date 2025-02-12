import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ActionSheet from "react-native-actions-sheet";
import styles from "./Styles";
import HeadingText from "../../HeadingText/HeadingText";
import { AppIcons } from "../../../libs";
import { moderateScale } from "react-native-size-matters";
import { AppColors } from "../../../utils/Global";
import CustomButton from "../../CustomButton/CustomButton";

const ExtractedItemsForm = ({ formRef, extractedData }) => {
  const [extractedItems, setExtractedItems] = useState(extractedData);
  const [chosenItems, setChosenItems] = useState([]);

  // Add an item to the chosenItems list
  const moveToChosen = (item) => {
    if (!chosenItems.includes(item)) {
      setChosenItems([...chosenItems, item]);
      setExtractedItems(
        extractedItems.filter((chosenItem) => chosenItem !== item)
      );
    }
  };

  // Remove an item from the chosenItems list
  const removeFromChosen = (item) => {
    setChosenItems(chosenItems.filter((chosenItem) => chosenItem !== item));
    setExtractedItems([...extractedItems, item]);
  };

  // Reset everything and hide the ActionSheet
  const handleDiscard = () => {
    setExtractedItems(extractedData); // Reset extractedItems to initial data
    setChosenItems([]); // Clear chosenItems
    formRef.current?.hide(); // Hide the ActionSheet
  };

  return (
    <ActionSheet ref={formRef} containerStyle={styles.containerStyle}>
      <View style={styles.btnsCtn}>
        <CustomButton label={"Done"} containerStyles={styles.btn} focusBtn />
        <AppIcons.CrossIcon
          size={moderateScale(30)}
          onPress={handleDiscard}
        />
      </View>
      <HeadingText
        heading={"Choose the items you want to add"}
        headingIndex={2.5}
      />

      <ScrollView>
        <View style={styles.itemsContainer}>
          {chosenItems.map((item, index) => {
            return (
              <TouchableOpacity
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
              </TouchableOpacity>
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
