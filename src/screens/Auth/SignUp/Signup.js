import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "../../../../assets/images";
import styles from "./Styles";
import CustomAuthHeader from "../../../components/CustomAuthHeader/CustomAuthHeader";
import NativeInput from "../../../components/NativeInput/NativeInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";
import { AppIcons } from "../../../libs";
import { AppColors } from "../../../utils/Global";
import auth, { updateProfile } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { showSuccess } from "../../../utils/MessageHandlers";

const Signup = (props) => {
  const { navigation } = props;
  const validationSchema = Yup.object({
    Username: Yup.string().required("Username required"),
    Email: Yup.string().email("Invalid Email").required("Email is required"),
    Password: Yup.string()
      .min(6, "Minimum 6 digits required")
      .required("Required Field"),
    ConfirmPassword: Yup.string()
      .oneOf([Yup.ref("Password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSignUp = async (values) => {
    auth()
      .createUserWithEmailAndPassword(
        values.Email.toLowerCase(),
        values.Password
      )
      .then(async (res) => {
        firestore()
          .collection("users")
          .doc(res?.user?.uid)
          .set({
            userName: values.Username,
            email: values.Email,
            userId: res?.user?.uid,
            dues: 0,
            createdAt: new Date().toISOString(),
            friends: [],
            chatRoomIds: []
          })
          .then(async () => {
            // Update user profile
            await updateProfile(res?.user, {
              displayName: values.Username,
            });
            showSuccess("Sign Up Successful");
            // setLoading(false);
            setTimeout(() => {
              navigation.navigate("Login");
            }, 1000);
          })
          .catch((error) => {
            throw new Error("failed to store in database" + error);
          });
      })
      .catch((error) => {
        console.log("createUserWithEmailAndPassword error:", error);
        // setLoading(false);
        if (error.code === "auth/email-already-in-use") {
          console.log(error);
          showError("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log(error);
          showError("That email address is invalid!");
        }

        console.error(error);
      });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <AppIcons.BackIcon1
          size={30}
          color={AppColors.iconColor}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.logoCtn}>
          <Image
            source={Images.Pay2ULogo}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <Text style={styles.desc}>
          Welcome to Pay2U, your bill splitting companion
        </Text>
        <CustomAuthHeader title={"Sign up"} />

        <KeyboardAwareScrollView>
          <Formik
            initialValues={{
              Username: "",
              Email: "",
              ConfirmPassword: "",
              Password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
          >
            {({ values, errors, touched, handleSubmit, handleChange }) => (
              <View style={styles.fieldsCtn}>
                <NativeInput
                  withOutIcon
                  label={"Username"}
                  value={values?.Username}
                  onChangeText={handleChange("Username")}
                  containerStyle={styles.inputStyles}
                />
                {errors?.Username && touched.Username && (
                  <Text style={styles.errorTxt}>
                    {errors?.Username || touched?.Username}
                  </Text>
                )}
                <NativeInput
                  withOutIcon
                  label={"Email"}
                  value={values?.Email}
                  onChangeText={handleChange("Email")}
                  containerStyle={styles.inputStyles}
                />
                {errors?.Email && touched.Email && (
                  <Text style={styles.errorTxt}>
                    {errors?.Email || touched?.Email}
                  </Text>
                )}
                <NativeInput
                  withEyeIcon
                  label={"Password"}
                  value={values?.Password}
                  onChangeText={handleChange("Password")}
                  containerStyle={styles.inputStyles}
                />
                {errors?.Password  && touched.Password && (
                  <Text style={styles.errorTxt}>
                    {errors?.Password || touched?.Password}
                  </Text>
                )}
                <NativeInput
                  withEyeIcon
                  label={"Confirm Password"}
                  value={values?.ConfirmPassword}
                  onChangeText={handleChange("ConfirmPassword")}
                  containerStyle={styles.inputStyles}
                />
                {errors?.ConfirmPassword && touched.ConfirmPassword && (
                  <Text style={styles.errorTxt}>
                    {errors?.ConfirmPassword || touched?.ConfirmPassword}
                  </Text>
                )}
                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                  <Text style={styles.btnTxt}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
