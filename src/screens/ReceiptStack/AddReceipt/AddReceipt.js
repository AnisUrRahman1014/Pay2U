import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  NativeModules,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import * as ImagePicker from "expo-image-picker";
import { AppIcons } from "../../../libs";
import { AppColors } from "../../../utils/Global";
import CustomButton from "../../../components/CustomButton/CustomButton";
import TextRecognition from "@react-native-ml-kit/text-recognition";
import GeneralHeader from "../../../components/Headers/GeneralHeader/GeneralHeader";
import { Formik } from "formik";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import NativeInput from "../../../components/NativeInput/NativeInput";
import * as Yup from "yup";
import { moderateScale } from "react-native-size-matters";

const AddReceipt = (props) => {
  const { navigation } = props;
  const [image, setImage] = useState(null);
  const [text, setText] = useState([]);
  const [items, setItems] = useState([]);
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();

  const validationSchema = Yup.object({
    name: Yup.string().required("Field Required"),
    price: Yup.string().required("Required"),
  });

  useEffect(() => {
    if (!image) return;
    extractText(image);
    console.log(JSON.stringify(text, null, 1));
  }, [image]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [3, 4],
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
      aspect: [3, 4],
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
      const rows = processLinesIntoItems(lines);

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

  const addItem = (values, resetForm) => {
    setItems((prevItems) => {
      // Check if an item with the same name already exists
      const existingItemIndex = prevItems.findIndex(
        (item) => item.itemName === values.name
      );

      if (existingItemIndex !== -1) {
        // If item exists, update the price
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].price = values.price;
        return updatedItems;
      } else {
        // If item does not exist, add a new item
        return [...prevItems, { itemName: values.name, price: values.price }];
      }
    });

    resetForm(); // Reset the form after submission
  };

  const deleteItem = (index) => {
    // Create a new array without the item at the specified index
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems); // Update the state
  };

  const confirmReciept = () => {
    // NAVIGATE TO THE CONFIRM RECEIPT SCREEM
    // CHOOSE THE ITEMS THAT YOU HAVE ORDERED.
    // ON THE NEXT SCREEN AFTER THAT, CHOOSE THE GROUP OR FRIEND TO ADD TO THE RECEIPT 
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <GeneralHeader />
      <Formik
        initialValues={{
          name: "",
          price: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => addItem(values, resetForm)}
      >
        {({ values, errors, touched, handleSubmit, handleChange }) => {
          return (
            <>
              <View style={styles.rowCtn}>
                <View>
                  <NativeInput
                    withOutIcon
                    placeholder="Item Name"
                    value={values.name}
                    onChangeText={handleChange("name")}
                    containerStyle={styles.inputStyles(200)}
                  />
                  {errors?.name && touched?.name && (
                    <Text style={styles.errorTxt}>
                      {errors?.name || touched?.name}
                    </Text>
                  )}
                </View>
                <View>
                  <NativeInput
                    withOutIcon
                    placeholder="Price"
                    value={values.price}
                    onChangeText={handleChange("price")}
                    keyboardType="numeric"
                    containerStyle={styles.inputStyles(150)}
                  />
                  {errors?.price && touched?.price && (
                    <Text style={styles.errorTxt}>
                      {errors?.price || touched?.price}
                    </Text>
                  )}
                </View>
              </View>
              <CustomButton
                focusBtn
                label={"Add Item"}
                onPress={handleSubmit}
              />
            </>
          );
        }}
      </Formik>
      <FlatList
        data={items}
        renderItem={({ item, index }) => {
          return (
            <View key={index} style={styles.itemListCtn}>
              <AppIcons.CrossIcon
                size={moderateScale(20)}
                color={AppColors.White}
                onPress={() => deleteItem(index)}
                style={{
                  marginRight: moderateScale(5),
                }}
              />
              <Text style={styles.desc1}>{item?.itemName}</Text>
              <Text style={styles.desc2}>$ {item?.price}</Text>
            </View>
          );
        }}
      />

      <View style={styles.separatorCtn}>
        <View style={styles.separator} />
        <Text style={styles.desc}>OR</Text>
        <View style={styles.separator} />
      </View>

      <CustomButton
        focusBtn
        label={"Capture"}
        onPress={takePhoto}
        containerStyles={{ backgroundColor: AppColors.iconColor }}
      />
      <CustomButton label={"Add from gallery"} onPress={pickImage} />

      <View style={styles.separatorCtn}>
        <View style={styles.separator} />
      </View>
      <CustomButton
        focusBtn
        label={"Confirm Receipt"}
        onPress={confirmReciept}
      />
    </SafeAreaView>
  );
};

export default AddReceipt;
