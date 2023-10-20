import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import ImageChanger from "./ImageChanger";
import { CarouselImageData } from "./ImageData";
import MatchBanner from "./MatchBanner";
import About from "./About";
import LatestMatches from "./Matches/LatestMatches";
import LatestMatchTable from "./Matches/LatestMatchTable";

const HomePage = () => {
  return (
    <View style={styles.container}>
      <ImageChanger images={CarouselImageData} duration={4000} />
      <MatchBanner />

      <About />
      {/* <LatestMatches /> */}

      <LatestMatchTable />
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
