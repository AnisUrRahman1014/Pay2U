import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import ActionSheet from "react-native-actions-sheet";
import styles from "./Styles";
import CustomButton from "../../CustomButton/CustomButton";
import { AppIcons } from "../../../libs";
import HeadingText from "../../HeadingText/HeadingText";
import { moderateScale } from "react-native-size-matters";
import { showError, showSuccess } from "../../../utils/MessageHandlers";
import { getFriendsChatRoomDocForUser } from "../../../services/queries";
import ContactViewCardSmall from "../../ContactViewCardSmall/ContactViewCardSmall";
import NativeInput from "../../NativeInput/NativeInput";
import { Formik } from "formik";
import * as Yup from "yup";
import { createNewGroup } from "../../../services/mutations";
import * as ImagePicker from "expo-image-picker";
import { AppColors } from "../../../utils/Global";

const NewGroupForm = ({ formRef }) => {
  const [friends, setFriends] = useState([]);
  const [chosenFriends, setChosenFriends] = useState([]);
  const [image, setImage] = useState(null);

  // Get user's friends
  useEffect(() => {
    getUserFriends();
  }, []);

  const choosePicture = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        showError("Sorry, we need camera roll permissions to make this work!");
        return;
      }

      // Launch the image picker
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0,
      });

      if (!result.canceled) {
        // Handle the selected image
        const selectedImage = result.assets[0].uri;
        setImage(selectedImage);
        // You can now use the selectedImage URI to update the profile picture
      } else {
        console.log("User cancelled image picker");
      }
    } catch (error) {
      console.log(error);
      showError(error.message);
    }
  };

  const getUserFriends = async () => {
    try {
      // GET FRIENDS
      const newFriends = await getFriendsChatRoomDocForUser();
      setFriends(newFriends);
    } catch (error) {
      showError("Something went wrong: ".concat(error.message));
      console.log("ERRORS", error);
    }
  };

  // Handle friend selection/deselection
  const handleFriendSelection = (friend) => {
    setChosenFriends((prevChosenFriends) => {
      if (prevChosenFriends.includes(friend)) {
        // Deselect friend
        return prevChosenFriends.filter((f) => f !== friend);
      } else {
        // Select friend
        return [...prevChosenFriends, friend];
      }
    });
  };

  // Handle "Done" button press
  const handleDone = async (values) => {
    try {
      if (chosenFriends.length === 0) {
        showError("Please select at least one friend.");
        return;
      }
      const response = await createNewGroup(values.groupName, chosenFriends, image);
      if (response.success) {
        showSuccess(`New group ${values.groupName} was created`);
      }
    } catch (error) {
      showError("Error creating group ".concat(error.message));
    } finally {
      setChosenFriends([]); // Clear selected friends
      formRef.current?.hide(); // Hide the ActionSheet
    }
  };

  // Handle "CrossIcon" button press
  const handleDiscard = () => {
    setChosenFriends([]); // Clear selected friends
    formRef.current?.hide(); // Hide the ActionSheet
  };

  const validationSchema = Yup.object({
    groupName: Yup.string().required("Required"),
  });

  return (
    <ActionSheet ref={formRef} containerStyle={styles.containerStyle}>
      <Formik
        initialValues={{
          groupName: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleDone}
      >
        {({ values, errors, touched, handleSubmit, handleChange }) => {
          return (
            <>
              <View style={styles.btnsCtn}>
                <CustomButton
                  label={"Done"}
                  containerStyles={styles.btn}
                  focusBtn
                  onPress={handleSubmit}
                />
                <AppIcons.CrossIcon
                  size={moderateScale(30)}
                  onPress={handleDiscard}
                />
              </View>
              {!image ? (
                <AppIcons.UserIcon
                  size={moderateScale(40)}
                  color={AppColors.White}
                  onPress={choosePicture}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={{ uri: image }}
                  style={styles.image}
                  resizeMode="contain"
                />
              )}
              <NativeInput
                withOutIcon
                label={"Group Name"}
                value={values?.groupName}
                onChangeText={handleChange("groupName")}
              />
              {errors?.groupName && touched?.groupName && (
                <Text style={styles.errorTxt}>
                  {errors?.groupName || touched?.groupName}
                </Text>
              )}
            </>
          );
        }}
      </Formik>
      <HeadingText
        heading={"Choose the friends you want to add"}
        headingIndex={2.5}
      />
      <ScrollView>
        {friends?.length > 0 &&
          friends.map((friend, index) => {
            const isSelected = chosenFriends.includes(friend);
            return (
              <ContactViewCardSmall
                key={index}
                data={friend}
                isFriendCard
                isSelected={isSelected}
                onPress={() => handleFriendSelection(friend)}
              />
            );
          })}
      </ScrollView>
    </ActionSheet>
  );
};

export default NewGroupForm;
