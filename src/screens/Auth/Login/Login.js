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
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  const validationSchema = Yup.object({
    Email: Yup.string().email("Invalid Email").required("Email is required"),
    Password: Yup.string()
      .min(6, "Minimum 6 digits required")
      .required("Required Field"),
  });

  const handleCredLogin = async (values) => {
    console.log(values);
  };

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
            onSubmit={handleCredLogin}
          >
            {({ values, errors, touched, handleSubmit, handleChange }) => (
              <View style={styles.fieldsCtn}>
                <NativeInput
                  withOutIcon
                  label={"Email"}
                  value={values?.Email}
                  onChangeText={handleChange("Email")}
                  containerStyle={styles.inputStyles}
                  errorText={errors.Email || touched.Email}
                />
                {(errors?.Email || touched?.Email) && (
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
                {(errors?.Password || touched?.Password) && (
                  <Text style={styles.errorTxt}>
                    {errors?.Password || touched?.Password}
                  </Text>
                )}
                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                  <Text style={styles.btnTxt}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.forgotBtnCtn}>
                  <Text style={styles.forgotBtn}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>

          <View style={styles.separator}>
            <View style={styles.bar} />
            <Text>OR</Text>
            <View style={styles.bar} />
          </View>

          <TouchableOpacity style={styles.googleBtn}>
            <View style={styles.googleIconCtn}>
              <Image
                source={Images.GoogleIcon}
                resizeMode="contain"
                style={styles.googleIcon}
              />
            </View>
            <Text style={styles.googleBtnTxt}>Sign in with Google</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signUpTxt}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
