import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
type ChangeEmailProps = {
  onClose: () => void;
};
const ChangePassword: React.FC<ChangeEmailProps> = ({ onClose }) => {
  return (
    <View style={styles.root}>
      <Text>ChangePassword</Text>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.alternative,
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
});
