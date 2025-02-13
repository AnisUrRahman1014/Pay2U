import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import styles from "./Styles";
import GeneralHeader from "../../../components/Headers/GeneralHeader/GeneralHeader";
import Checkbox from "expo-checkbox";
import HeadingText from "../../../components/HeadingText/HeadingText";
import { AppColors } from "../../../utils/Global";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { moderateScale } from "react-native-size-matters";
import { Theme } from "../../../libs";
import { showError } from "../../../utils/MessageHandlers";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const ConfirmReceipt = (props) => {
  const { items } = props?.route?.params;

  const navigation = useNavigation();

  const currentUser = useSelector((state) => state?.persistSlice?.user);
  const userId = currentUser?.uid;

  // State to track selected items
  const [selectedItems, setSelectedItems] = useState({});
  const [isPaidFirst, setIsPaidFirst] = useState(false);

  const toggleIsPaid = () => {
    setIsPaidFirst((prev) => !prev);
  };

  // Function to handle item selection
  const handleItemSelection = (itemName) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [itemName]: !prevSelectedItems[itemName], // Toggle selection
    }));
  };

  const handleConfirm = () => {
    const orderedItems = items.filter((item) => selectedItems[item.itemName]);
    const receipt = {
      items,
      userItems: [
        {
          userId: userId,
          orderedItems,
        },
      ],
      paidBy: isPaidFirst ? userId : null,
    };
    navigation.navigate("ChooseMembers", {
      receipt
    });
  };

  // Function to render each item in the list
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.row}>
        <Checkbox
          value={selectedItems[item.itemName] || false}
          onValueChange={() => handleItemSelection(item.itemName)}
          color={selectedItems[item.itemName] ? AppColors.Primary : undefined}
        />
        <Text style={styles.itemText}>{item.itemName}</Text>
      </View>
      <Text style={styles.itemText}>$ {item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <GeneralHeader header="Confirm Receipt" />
      <View style={styles.container}>
        <HeadingText
          heading={"Please choose the items you have paid for:"}
          headingIndex={2.5}
        />

        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.itemName}
        />

        <View style={[styles.row, { paddingHorizontal: moderateScale(20) }]}>
          <Checkbox
            value={isPaidFirst}
            onValueChange={toggleIsPaid}
            color={isPaidFirst ? Theme.colors.link : undefined}
          />
          <Text style={styles.itemText}>
            Check this if you have paid the bill.
          </Text>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmReceipt;
