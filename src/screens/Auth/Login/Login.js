import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "../../../../assets/images";
import styles from "./Styles";
import CustomAuthHeader from "../../../components/CustomAuthHeader/CustomAuthHeader";
import NativeInput from "../../../components/NativeInput/NativeInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const validationSchema = Yup.object({
    Email: Yup.string().email("Invalid Email").required("Email is required"),
    Password: Yup.string()
      .min(6, "Minimum 6 digits required")
      .required("Required Field"),
  });
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
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
        <CustomAuthHeader title={"Login"} />

        <KeyboardAwareScrollView>
          <Formik
            initialValues={{
              Email: "",
              Password: "",
            }}
            validationSchema={validationSchema}
          >
            {({ values, errors, touched, handleSubmit, handleChange }) => (
              <>
                <NativeInput
                  withOutIcon
                  label={"Email"}
                  value={values?.Email}
                  onChangeText={handleChange("Email")}
                  containerStyle={styles.inputStyles}
                />
                <NativeInput
                  withEyeIcon
                  label={"Password"}
                  value={values?.Password}
                  onChangeText={handleChange("Password")}
                  containerStyle={styles.inputStyles}
                />
              </>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Login;
