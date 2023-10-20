import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Colors } from "../../../../constants/Colors";

const LatestMatches = () => {
  return (
    <View style={styles.root}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../../assets/images/korpen.png")}
          style={styles.image}
        />
        <Text style={styles.text}>Korpen</Text>
      </View>
      <View>
        <Text style={styles.text}>( Latest Matches )</Text>
      </View>
    </View>
  );
};

export default LatestMatches;

const styles = StyleSheet.create({
  root: {
    width: "90%",
    backgroundColor: "#000000",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  image: {
    width: 30,
    height: 30,
  },
  text: {
    color: "#808080",
    fontFamily: "source-sans",
    fontWeight: "bold",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
