import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppColors } from "../../../utils/Global";
import styles from "./Styles";
import HeadingText from "../../../components/HeadingText/HeadingText";
import { AppIcons } from "../../../libs";
import { moderateScale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.summaryCtn}>
          <View style={styles.leftCtn}></View>
          <View style={styles.rightCtn}></View>
        </View>

        <HeadingText heading="Groups" headingIndex={2} />
        <View style={styles.container}></View>
        <HeadingText heading="Individuals" headingIndex={2} />
        <View style={styles.container}></View>
      </ScrollView>
      <AppIcons.CameraIcon
        size={moderateScale(35)}
        color={AppColors.White}
        style={styles.addBtn}
        onPress={() => navigation.navigate("ReceiptStack")}
      />
    </SafeAreaView>
  );
};

export default Home;
