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
              { backgroundColor: index % 2 === 0 ? "#323232" : "#3f3f3f" },
            ]}
          >
            <Text style={styles.matchDate}>{item.date}</Text>
            <Text>{item.awayTeam.name}</Text>
            <Image source={item.awayTeam.src} style={styles.teamLogo} />
            <Text>{item.result}</Text>
            <Image source={item.homeTeam.src} style={styles.teamLogo} />
            <Text>{item.homeTeam.name}</Text>
          </View>
        )}
        scrollEnabled={false}
      />

      <View style={styles.paginationContainer}>
        {currentPage > 1 && (
          <TouchableOpacity onPress={prevPage}>
            <Text style={styles.paginationText}>Previous</Text>
          </TouchableOpacity>
        )}
        {LatestMatchesData.length > lastMatchIndex && (
          <TouchableOpacity onPress={nextPage}>
            <Text style={styles.paginationText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "90%",
    backgroundColor: "#000000",
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  headerContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
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
    marginVertical: 5,
    padding: 10,
  },
  matchDate: {
    color: Colors.yellow,
  },
  teamLogo: {
    width: 30,
    height: 30,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  paginationText: {
    color: Colors.yellow,
    fontSize: 16,
  },
});

export default LatestMatchTable;
