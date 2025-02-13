import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../redux/slices/persistSlice";
import auth from "@react-native-firebase/auth";
import { showError } from "../../../utils/MessageHandlers";
import styles from "./Styles";
import AppIcons from "../../../libs/NativeIcons";
import NativeInput from "../../../components/NativeInput/NativeInput";
import { moderateScale } from "react-native-size-matters";
import { AppColors } from "../../../utils/Global";
import { Formik } from "formik";

const Account = () => {
  const dispatch = useDispatch();

  const user = useSelector(state => state?.persistSlice?.user);

  const [dp, setDp] = useState(null);
  const handleLogout = async () => {
    try {
      await auth().signOut();
      dispatch(logoutUser(null));
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.dpCtn} disabled={true}>
          {dp ? (
            <Image />
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
            Email: user?.email
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => {
            return (
              <View style={styles.fieldsCtn}>
                <NativeInput
                  withOutIcon
                  label={"Username"}
                  value={values?.Username}
                  onChangeText={handleChange("Username")}
                  containerStyle={styles.inputStyles}
                  editable={false}
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
        focusBtn
        label={"Logout"}
        onPress={handleLogout}
        containerStyles={styles.logoutBtn}
      />
    </SafeAreaView>
  );
};

export default Account;
