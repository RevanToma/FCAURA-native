import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../../constants/Colors";

const About = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        I skymningen av 2022, på en gräsbevuxen plan någonstans i Sverige, lades
        grunden till något storslaget. Med passionen för fotbollen pulserande i
        hjärtat och drömmen om stunder fyllda av gemenskap och äkta laganda,
        föddes FC Aura. Det var inte bara ett lag som kom till världen, utan en
        familj. Här, där varje passning, varje skott och varje skratt binder oss
        samman, skapar vi vårt eget kapitel i fotbollens historia. Vi är mer än
        bara spelare på en plan. Vi är ett lag, en enhet, en aura av passion.
        Välkommen till FC Aura – där varje match inte bara handlar om att vinna,
        utan om att forma en saga som vi alla är en del av.
      </Text>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  root: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.white,
    fontSize: 17,
    fontFamily: "source-sans",
    letterSpacing: 1,
    textAlign: "center",
    padding: 5,
  },
});
