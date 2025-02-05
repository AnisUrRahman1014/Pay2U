import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
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
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/persistSlice";
import auth, { updateProfile } from "@react-native-firebase/auth";
import { showError } from "../../../utils/MessageHandlers";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import firestore from "@react-native-firebase/firestore";

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    Email: Yup.string().email("Invalid Email").required("Email is required"),
    Password: Yup.string()
      .min(6, "Minimum 6 digits required")
      .required("Required Field"),
  });

  GoogleSignin.configure({
    webClientId:
      Platform.OS == "ios"
        ? "958861649906-c4pr276n7f2qh9vdkl3i8ac4vvclalvd.apps.googleusercontent.com"
        : "958861649906-hvbjlgaqpv6pcjssj62aj5i2b5f3f071.apps.googleusercontent.com",
  });

  async function onGoogleButtonPress() {
    try {
      const isSignedIn = GoogleSignin.getCurrentUser();
      if (isSignedIn !== null) await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const userInfo = await GoogleSignin.signIn();

      const { user, idToken } = userInfo?.data;
      // console.log("User Info", JSON.stringify(userInfo, null, 1));

      // Create a Firebase credential using the ID token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in to Firebase with the credential
      const firebaseUserCredential = await auth().signInWithCredential(
        googleCredential
      );

      if (firebaseUserCredential?.user) {
        const userData = {
          userId: firebaseUserCredential?.user?.uid,
          email: firebaseUserCredential?.user?.email,
          userName: firebaseUserCredential.user.displayName,
          dues: 0,
          createdAt: new Date().toISOString(),
          friends: [],
          chatRoomIds: [],
        };
        // Dispatch the user data to Redux (if required)
        dispatch(setUser(firebaseUserCredential.user));
        await firestore()
          .collection("users") // Adjust the collection name if needed
          .doc(userData.userId) // Use the UID as the document ID
          .set(userData, { merge: true });
      }
    } catch (error) {
      console.error("Error", "Failed to sign in with Google", error);
    }
  }

  const handleCredLogin = (values) => {
    try {
      auth()
        .signInWithEmailAndPassword(values.Email, values.Password)
        .then((res) => {
          if (res?.user?.uid) {
            const str = JSON.stringify(res);
            const prs = JSON.parse(str);
            const user = {
              uid: prs.user.uid,
              email: prs.user.email,
              displayName: prs.user.displayName,
              photoURL: prs.user.photoURL,
            };
            // Changing the Redux state for the user automatically switches the stack from AuthStack to MainStack
            dispatch(setUser(prs?.user));
          }
        })
        .catch((error) => {
          console.log("Login Error:", error);
          if (error.code === "auth/invalid-credential") {
            showError("Incorrect Credentials. Please check your credentials");
          }
        });
    } catch (error) {
      console.log(error);
    }
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

          <TouchableOpacity
            style={styles.googleBtn}
            onPress={onGoogleButtonPress}
          >
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
