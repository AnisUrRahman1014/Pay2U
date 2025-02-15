import {
  View,
  Text,
  SafeAreaView,
  Button,
  TouchableOpacity,
  NativeModules,
  ScrollView,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import { showError } from "../../../utils/MessageHandlers";
import { CommonActions } from "@react-navigation/native";
import ExtractedItemsForm from "../../../components/ActionSheets/ExtractedItemsForm/ExtractedItemsForm";

const AddReceipt = (props) => {
  const { navigation } = props;

  const extractedItemsRef = useRef();

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
      extractText(result.assets[0].uri)
    }
  };

  const extractText = async (imageUri) => {
    try {
      const result = await TextRecognition.recognize(imageUri);
      const rawText = result.text;
      const lines = rawText.split("\n").filter((line) => line.trim() !== "");
      // Process lines to create row objects
      // const rows = processLinesIntoItems(lines);

      // Log the rows for debugging
      // console.log("Rows:", JSON.stringify(rows, null, 1));
      setText(lines);
      setText(lines);
      extractedItemsRef.current.show();
    } catch (error) {
      console.error("Error extracting text:", error);
    }
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
    if (items.length === 0) {
      showError("Please add at least one Item");
      return;
    }
    // NAVIGATE TO THE CONFIRM RECEIPT SCREEN
    navigation.navigate("ConfirmReceipt", {
      items,
    });
  };

  const confirmExit = () => {
    Alert.alert("Confirmation", "Are you sure you want to exit?", [
      { text: "Cancel", onPress: () => {} },
      {
        text: "Yes, exit",
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <GeneralHeader header={"Add New Receipt"} leftIconOnPress={confirmExit} />
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
                    inputStyle={styles.txt}

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
                    inputStyle={styles.txt}
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
              <View style={styles.row}>
                <AppIcons.CrossIcon
                  size={moderateScale(20)}
                  color={AppColors.White}
                  onPress={() => deleteItem(index)}
                  style={{
                    marginRight: moderateScale(5),
                  }}
                />
                <Text style={styles.desc1}>{item?.itemName}</Text>
              </View>
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
      <ExtractedItemsForm
        formRef={extractedItemsRef}
        extractedData={text}
        setItems={setItems}
        items={items}
      />
    </SafeAreaView>
  );
};

export default AddReceipt;
