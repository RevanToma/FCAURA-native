import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

const TeamMembers = () => {
  return (
    <View style={styles.root}>
      <Text>TeamMembers</Text>
    </View>
  );
};

export default TeamMembers;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.alternative,
  },
});
