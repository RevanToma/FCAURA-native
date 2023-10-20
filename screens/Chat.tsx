import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

const Chat = () => {
  return (
    <View style={styles.root}>
      <Text>Chat</Text>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.alternative,
  },
});
