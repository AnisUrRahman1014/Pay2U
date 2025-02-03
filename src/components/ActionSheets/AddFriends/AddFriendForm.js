import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import ActionSheet from "react-native-actions-sheet";
import styles from "./Styles";
import HeadingText from "../../HeadingText/HeadingText";
import NativeInput from "../../NativeInput/NativeInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";
import { AppIcons } from "../../../libs";
import { moderateScale } from "react-native-size-matters";
import { AppColors, FirebaseContants } from "../../../utils/Global";
import firestore from "@react-native-firebase/firestore";
import { useSelector } from "react-redux";
import { showError, showInfo, showSuccess } from "../../../utils/MessageHandlers";

const AddFriendForm = ({ formRef }) => {
  const currentUser = useSelector((state) => state?.persistSlice?.user);
  const userId = currentUser?.uid;
  const validationSchema = Yup.object({
    Email: Yup.string().email("Invalid email").required("Email required"),
    // Username: Yup.string().required("Required"),
  });

  const handleAddFreind = async (values) => {
    if (values?.Email === currentUser?.email) {
      showError('Cannot add yourself')
      return;
    }
    try {
      const collectionRef = await firestore()
        .collection(FirebaseContants.users)
        .get();
      let foundUser = false;

      collectionRef.forEach((doc) => {
        const user = doc.data();
        if (user?.email === values?.Email) {
          foundUser = user;
        }
      });

      if (!foundUser) {
        console.log("User not found with the provided email");
        showError("User not found with the provided email");
        return;
      }

      // Step 4: Get the current user document (assuming `userId` is defined elsewhere)
      const userDocRef = firestore()
        .collection(FirebaseContants.users)
        .doc(userId);
      const userDoc = await userDocRef.get();

      // Step 5: Ensure that current user has a 'friends' field
      if (!userDoc.exists) {
        console.log("Current user document does not exist");
        showError("Current user document does not exist");
        return;
      }

      const userData = userDoc.data();
      let currentUserFriends = userData?.friends || [];

      // Step 6: Check if the user is already a friend
      if (currentUserFriends.includes(foundUser.userId)) {
        showInfo("User is already a friend");
        return;
      }

      // Step 7: Add friend to the current user's friends array
      currentUserFriends.push(foundUser.userId);

      // Step 8: Update the current user's document with the new friends array
      await userDocRef.update({
        friends: currentUserFriends,
      });

      showSuccess("Friend added successfully");
    } catch (error) {
      showError('Something went wrong | Add friend')
      console.log("Error adding new friend", error);
    }
  };

  return (
    <ActionSheet ref={formRef} containerStyle={styles.containerStyle}>
      <AppIcons.CrossIcon
        size={moderateScale(30)}
        color={AppColors.iconColor}
        style={{ alignSelf: "flex-end" }}
        onPress={() => formRef.current.hide()}
      />
      <HeadingText
        heading={"Please provide the user's email to add"}
        headingIndex={2.5}
      />

      <KeyboardAwareScrollView>
        <Formik
          initialValues={{
            // Username: "",
            Email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleAddFreind}
        >
          {({ values, errors, touched, handleSubmit, handleChange }) => (
            <View style={styles.fieldsCtn}>
              {/* <NativeInput
                withOutIcon
                label={"Display Name"}
                value={values?.Username}
                onChangeText={handleChange("Username")}
                containerStyle={styles.inputStyles}
              />
              {errors?.Username && (
                <Text style={styles.errorTxt}>
                  {errors?.Username || touched?.Username}
                </Text>
              )} */}
              <NativeInput
                withOutIcon
                label={"Email"}
                value={values?.Email}
                onChangeText={handleChange("Email")}
                containerStyle={styles.inputStyles}
              />
              {errors?.Email && (
                <Text style={styles.errorTxt}>
                  {errors?.Email || touched?.Email}
                </Text>
              )}

              <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                <Text style={styles.btnTxt}>Add</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </ActionSheet>
  );
};

export default AddFriendForm;
