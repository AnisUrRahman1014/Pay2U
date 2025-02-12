import { View, Text, SafeAreaView, ScrollView, FlatList } from "react-native";
import React, { useCallback, useState } from "react";
import styles from "./Styles";
import HeadingText from "../../../components/HeadingText/HeadingText";
import { useFocusEffect } from "@react-navigation/native";
import { showError } from "../../../utils/MessageHandlers";
import { getActivitiesForUser } from "../../../services/queries";
import { AppColors, formateDate } from "../../../utils/Global";
import { Theme } from "../../../libs";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  useFocusEffect(
    useCallback(() => {
      getActivities();
    }, [])
  );

  const getActivities = async () => {
    try {
      const response = await getActivitiesForUser();
      console.log(response);
      setActivities(response);
    } catch (error) {
      showError("Error getting activities ".concat(error.message));
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeadingText heading={"Activities"} headingIndex={1.5} />
      <FlatList
        data={activities}
        renderItem={({ item, index }) => {
          return (
            <View style={[styles.activityCard, {backgroundColor: item?.type === 'sent' ? Theme.colors.AngryPasta : AppColors.Primary}]}>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.time}>{formateDate(item.createdAt, 'withTime')}</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Activities;
