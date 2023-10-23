import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LatestMatchesData } from "./latestMatchesData";
import { Colors } from "../../../../constants/Colors";

const LatestMatchTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const matchesPerPage = 5;

  const lastMatchIndex = currentPage * matchesPerPage;
  const firstMatchIndex = lastMatchIndex - matchesPerPage;
  const currentMatches = LatestMatchesData.slice(
    firstMatchIndex,
    lastMatchIndex
  );

  const nextPage = () => {
    setCurrentPage((prevPageNumber) => prevPageNumber + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPageNumber) => prevPageNumber - 1);
  };

  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../../assets/images/korpen.png")}
            style={styles.image}
          />
          <Text style={styles.text}>Korpen</Text>
        </View>
        <Text style={styles.text}>( Latest Matches )</Text>
      </View>

      <FlatList
        data={currentMatches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.matchContainer,
              { backgroundColor: index % 2 === 0 ? "#2C2C2C" : "#1D1D1D" },
            ]}
          >
            <Text style={styles.matchDate}>{item.date}</Text>
            <Text style={[styles.matchText, styles.teamNameContainer]}>
              {item.awayTeam.name}
            </Text>
            <Image source={item.awayTeam.src} style={styles.teamLogo} />
            <Text style={[styles.matchText, styles.scoreContainer]}>
              {item.result}
            </Text>
            <Image source={item.homeTeam.src} style={styles.teamLogo} />
            <Text style={[styles.matchText, { color: Colors.yellow }]}>
              {item.homeTeam.name}
            </Text>
          </View>
        )}
        scrollEnabled={false}
      />

      <View style={styles.paginationContainer}>
        {currentPage > 1 && (
          <TouchableOpacity onPress={prevPage}>
            <Text style={[styles.paginationText, { marginLeft: "auto" }]}>
              Previous
            </Text>
          </TouchableOpacity>
        )}
        {LatestMatchesData.length > lastMatchIndex && (
          <TouchableOpacity onPress={nextPage} style={{ marginLeft: "auto" }}>
            <Text style={styles.paginationText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "95%",
    backgroundColor: "#000000",
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 15,
    elevation: 3,
    shadowColor: "#1e1e1e",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerContainer: {
    marginBottom: 15,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    padding: 2,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
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
  matchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  matchDate: {
    color: Colors.yellow,
    fontFamily: "lato-bold",
  },
  teamLogo: {
    width: 30,
    height: 30,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 5,
    padding: 5,
  },
  paginationText: {
    color: Colors.yellow,
    fontSize: 16,
  },

  matchText: {
    color: Colors.white,
    fontFamily: "lato-bold",
  },
  scoreContainer: {
    width: 50,
    alignItems: "center",
    marginLeft: 15,
  },
  teamNameContainer: {
    flex: 1,
    marginLeft: 10,
  },
});

export default LatestMatchTable;
