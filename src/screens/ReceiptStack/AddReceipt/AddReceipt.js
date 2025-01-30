import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  NativeModules,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import * as ImagePicker from "expo-image-picker";
import { AppIcons } from "../../../libs";
import { AppColors } from "../../../utils/Global";
import CustomButton from "../../../components/CustomButton/CustomButton";
import TextRecognition from "@react-native-ml-kit/text-recognition";

const AddReceipt = (props) => {
  const { navigation } = props;
  const [image, setImage] = useState(null);
  const [text, setText] = useState([]);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  useEffect(() => {
    if (!image) return;
    extractText(image);
    console.log(JSON.stringify(text, null, 1));
  }, [image]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      extractText(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const extractText = async (imageUri) => {
    try {
      const result = await TextRecognition.recognize(imageUri);
      const rawText = result.text;
      const lines = rawText.split("\n").filter((line) => line.trim() !== "");
      console.log(lines);
      // Process lines to create row objects
      const rows = processLinesIntoRows(lines);

      // Log the rows for debugging
      console.log("Rows:", JSON.stringify(rows, null, 1));
      setText(lines);
    } catch (error) {
      console.error("Error extracting text:", error);
    }
  };

  // const processLinesIntoRows = (lines) => {
  //   const rows = [];

  //   // Temporary variables to store item details
  //   let currentItem = null;

  //   lines.forEach((line) => {
  //     // Check if the line starts with a number (assume it's an item identifier)
  //     if (/^\d+/.test(line)) {
  //       // If there's a current item being processed, add it to the rows array
  //       if (currentItem) {
  //         rows.push(currentItem);
  //       }

  //       // Extract the identifier and description
  //       const match = line.match(/^(\d+)\s+(.*)/);
  //       if (match) {
  //         currentItem = {
  //           id: match[1], // Identifier (e.g., 45, 48)
  //           description: match[2], // Description (e.g., "Bachelors and Masters Deg")
  //           price: "", // Initialize price as empty
  //         };
  //       }
  //     }
  //     // Check if the line starts with "Rs." (assume it's a price)
  //     else if (/^Rs\./.test(line)) {
  //       if (currentItem) {
  //         // Extract the price
  //         const priceMatch = line.match(/Rs\.(\d+\.?\d*)/);
  //         if (priceMatch) {
  //           currentItem.price = `Rs.${priceMatch[1]}`; // Set the price
  //         }

  //         // Add the current item to the rows array
  //         rows.push(currentItem);
  //         currentItem = null; // Reset the current item
  //       }
  //     }
  //   });

  //   // If there's a remaining item, add it to the rows array
  //   if (currentItem) {
  //     rows.push(currentItem);
  //   }

  //   return rows;
  // };

  const processLinesIntoItems = (lines) => {
    const items = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Skip lines that are too short or don't contain meaningful data
      if (line.trim().length < 3) continue;

      // Use regex to find prices in the line
      const priceMatch = line.match(/(Rs\.|₹|\$|€)?\s*(\d+\.?\d*)/);
      if (priceMatch) {
        const price = priceMatch[0]; // Full price match (e.g., "Rs.10.50")
        const priceIndex = line.lastIndexOf(price); // Find the position of the price

        // Extract the item name (everything before the price)
        let itemName = line.substring(0, priceIndex).trim();

        // If the item name is empty, skip this line
        if (!itemName) continue;

        // Add the item to the items array
        items.push({
          item: itemName,
          price: price,
        });
      }
    }

    return items;
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View
        style={[
          styles.mainContainer,
          { alignItems: "center", justifyContent: "center" },
        ]}
      >
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerCtn}>
        <AppIcons.BackIcon1
          size={30}
          color={AppColors.iconColor}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.container}>
        <View style={styles.imageCtn}></View>
        <CustomButton focusBtn label={"Capture"} onPress={takePhoto} />
        <View style={styles.separatorCtn}>
          <View style={styles.separator} />
          <Text style={styles.desc}>OR</Text>
          <View style={styles.separator} />
        </View>
        <CustomButton label={"Add from gallery"} onPress={pickImage} />
      </View>
    </SafeAreaView>
  );
};

export default AddReceipt;
