import { Button, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import { Colors } from "../constants/Colors";

import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";

const ChangeEmail = () => {
  return (
    <View style={styles.root}>
      <Text>ChangeEmail</Text>
      {/* <Button title="close" onPress={handleClosePress} /> */}
    </View>
  );
};

export default ChangeEmail;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.alternative,
  },
});
