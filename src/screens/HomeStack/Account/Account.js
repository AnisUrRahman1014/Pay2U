import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, setUser } from "../../../redux/slices/persistSlice";
import auth from "@react-native-firebase/auth";
import { showError, showSuccess } from "../../../utils/MessageHandlers";
import styles from "./Styles";
import AppIcons from "../../../libs/NativeIcons";
import NativeInput from "../../../components/NativeInput/NativeInput";
import { moderateScale } from "react-native-size-matters";
import { AppColors } from "../../../utils/Global";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import { updateProfile } from "../../../services/mutations";

const Account = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.persistSlice?.user);
  // console.log(JSON.stringify(user, null, 1));

  const [editable, setEditable] = useState(false);
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (user) {
      setProfilePic(user.photoURL || null);
      setUsername(user.displayName || "");
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await auth().signOut();
      dispatch(logoutUser(null));
    } catch (error) {
      showError(error.message);
    }
  };

  const handleProfileChange = async () => {
    // Request permission to access the media library
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
        setProfilePic(selectedImage);
        // You can now use the selectedImage URI to update the profile picture
      } else {
        console.log("User cancelled image picker");
      }
    } catch (error) {
      console.log(error);
      showError(error.message);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await updateProfile(username, profilePic);
      if (response.success) {
        dispatch(setUser(response.user));
      }
      showSuccess("Profile updated successfully");
    } catch (error) {
      console.log(error);
      showError("Error updating profile: ", error.message);
    } finally {
      setEditable(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.dpCtn}
          disabled={!editable}
          onPress={handleProfileChange}
        >
          {profilePic ? (
            <Image
              source={{ uri: profilePic }}
              style={styles.dp}
              resizeMode="contain"
            />
          ) : (
            <AppIcons.UserIcon
              size={moderateScale(50)}
              color={AppColors.White}
              style={styles.dp}
              disabled
            />
          )}
        </TouchableOpacity>
        <Formik
          initialValues={{
            Username: user?.displayName,
            Email: user?.email,
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => {
            return (
              <View style={styles.fieldsCtn}>
                <NativeInput
                  withOutIcon
                  label={"Username"}
                  value={values?.Username}
                  onChangeText={(text) => {
                    handleChange("Username");
                    setUsername(text)
                  }}
                  containerStyle={styles.inputStyles}
                  editable={editable}
                />
                {errors?.Username && (
                  <Text style={styles.errorTxt}>
                    {errors?.Username || touched?.Username}
                  </Text>
                )}
                <NativeInput
                  withOutIcon
                  value={values.Email}
                  label="Email"
                  onChangeText={handleChange("Email")}
                  containerStyle={styles.inputStyles}
                  editable={false}
                />
                {errors?.Email && touched?.Email && (
                  <Text style={styles.errorTxt}>
                    {errors?.Email || touched?.Email}
                  </Text>
                )}
              </View>
            );
          }}
        </Formik>
      </View>
      <CustomButton
        label={editable ? "Update" : "Edit"}
        onPress={() => {
          if (!editable) {
            setEditable(true);
          } else {
            handleUpdate();
          }
        }}
        containerStyles={styles.simpleBtn}
      />

      <CustomButton
        focusBtn
        label={"Logout"}
        onPress={handleLogout}
        containerStyles={styles.logoutBtn}
      />
    </SafeAreaView>
  );
};

export default Account;
