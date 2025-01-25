import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppColors } from "../../../utils/Global";
import styles from "./Styles";
import HeadingText from "../../../components/HeadingText/HeadingText";

const Home = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.summaryCtn}>
        <View style={styles.leftCtn}></View>
        <View style={styles.rightCtn} />
      </View>

      <HeadingText heading="Groups" headingIndex={2} />
    </SafeAreaView>
  );
};

export default Home;
