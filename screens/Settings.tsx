import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

const Settings = () => {
  return (
    <View style={styles.root}>
      <Text>Settings</Text>
    </View>
  );
};

export default Settings;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.alternative,
  },
});
