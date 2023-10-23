import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Colors } from "../../../../constants/Colors";

const MatchBanner = () => {
  return (
    <View style={styles.matchDayContainer}>
      <View>
        <Text style={styles.matchDayText}>Matchday</Text>
        <Text style={styles.matchDayText}>8</Text>
      </View>
      <View style={styles.matchInfoContainer}>
        <Text style={styles.opponent}>Stockholm United FC</Text>
        <View>
          <Text style={styles.vs}>VS</Text>
        </View>
        <View>
          <Image
            source={require("./../../../../assets/images/FCAURA-Logo.png")}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.whereContainer}>
        <Text style={styles.where}>SÖNDAG 20 AUGUSTI</Text>
        <Text style={styles.where}>20:00</Text>
        <Text style={styles.where}>SANDÅKRA BP</Text>
      </View>
      <Text style={styles.korpen}>KORPEN</Text>
    </View>
  );
};

export default MatchBanner;

const styles = StyleSheet.create({
  matchDayContainer: {
    position: "absolute",
    flexDirection: "column",

    top: 0,
    left: 0,
    width: "100%",
    marginTop: 6,
    alignItems: "center",
    justifyContent: "center",

    gap: 10,
  },
  matchDayText: {
    color: Colors.bannerColor,
    fontSize: 35,
    fontFamily: "lato-bold",
    letterSpacing: 1,
    alignSelf: "center",
  },
  image: {
    width: 60,
    height: 60,
  },
  matchInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    gap: 40,
    paddingRight: 30,
  },
  opponent: {
    color: Colors.bannerColor,
    fontSize: 19,
    fontFamily: "lato-bold",
    letterSpacing: 1,
    maxWidth: 100,
  },
  vs: {
    color: Colors.white,
    fontSize: 40,
    fontFamily: "lato-bold",
  },
  where: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "lato-bold",
    letterSpacing: 1,
  },
  whereContainer: {
    width: 180,
    alignItems: "center",
    gap: 5,
    paddingTop: 20,
  },
  korpen: {
    fontFamily: "rubik-microbe",
    color: Colors.white,
    fontSize: 40,

    paddingVertical: 50,
  },
});
