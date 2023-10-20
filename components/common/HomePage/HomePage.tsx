import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ImageChanger from "./ImageChanger";
import { CarouselImageData } from "./ImageData";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <ImageChanger images={CarouselImageData} duration={4000} />
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
