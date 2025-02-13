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
import {
  showError,
  showInfo,
  showSuccess,
} from "../../../utils/MessageHandlers";
import auth from "@react-native-firebase/auth";

const ResetPasswordForm = ({ formRef }) => {
  const currentUser = useSelector((state) => state?.persistSlice?.user);
  const userId = currentUser?.uid;
  const validationSchema = Yup.object({
    Email: Yup.string().email("Invalid email").required("Email required"),
    // Username: Yup.string().required("Required"),
  });

  const handlePasswordReset = async (values) => {
    try {
      const response = await auth().sendPasswordResetEmail(values.Email);
      console.log(response)
      showSuccess("Email sent successfully");
      formRef.current.hide();
    } catch (error) {
      showError("Something went wrong: ".concat(error.message));
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
        heading={"Please provide the email to reset"}
        headingIndex={2.5}
      />

      <KeyboardAwareScrollView>
        <Formik
          initialValues={{
            Email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handlePasswordReset}
        >
          {({ values, errors, touched, handleSubmit, handleChange }) => (
            <View style={styles.fieldsCtn}>
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
                <Text style={styles.btnTxt}>Reset</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </ActionSheet>
  );
};

export default ResetPasswordForm;
