import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import HomePage from "../components/common/HomePage/HomePage";

const Home = () => {
  return (
    <View style={styles.root}>
      <HomePage />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 2,
    backgroundColor: Colors.alternative,
  },
});
