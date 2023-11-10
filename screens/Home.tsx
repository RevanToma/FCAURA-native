import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import ImageChanger from "../components/common/HomePage/MatchBanner/ImageChanger";
import { CarouselImageData } from "../components/common/HomePage/MatchBanner/ImageData";
import MatchBanner from "../components/common/HomePage/MatchBanner/MatchBanner";
import About from "../components/common/HomePage/About";
import LatestMatchTable from "../components/common/HomePage/Matches/LatestMatchTable";
import { Colors } from "../constants/Colors";

const Home = () => {
  return (
    <ScrollView style={styles.root}>
      <View style={styles.container}>
        <ImageChanger images={CarouselImageData} duration={4000} />
        <MatchBanner />
        <About />
        <LatestMatchTable />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.alternative,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
