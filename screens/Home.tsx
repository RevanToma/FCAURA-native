import { StyleSheet, Text, ScrollView, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import HomePage from "../components/common/HomePage/HomePage";

const Home = () => {
  return (
    <ScrollView style={styles.root}>
      <HomePage />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.alternative,
  },
});
