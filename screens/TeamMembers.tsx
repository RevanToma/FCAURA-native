import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import {
  DocumentData,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import BottomSheet from "@gorhom/bottom-sheet";

import { FlashList } from "@shopify/flash-list";
import { formatName } from "../utils/helpers/Helpers";
import Button from "../components/common/Buttons/Button";
import { db } from "../firebase/firebase.auth";
import { useBottomSheet } from "../utils/hooks/useBottomSheet";
import TeamMemberProfileCard from "../components/TeamMemberProfileCard/TeamMemberProfileCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState<DocumentData[]>([]);

  const {
    bottomSheetRef,
    closeBottomSheet,
    openBottomSheetWithContent,
    snapPoints,
    ContentComponent,
    afterCloseResetContent,
  } = useBottomSheet();

  const openTeamMemberProfile = (uid: string) => {
    openBottomSheetWithContent(
      <TeamMemberProfileCard uid={uid} onClose={closeBottomSheet} />
    );
  };

  useEffect(() => {
    // subscription to Firebase
    const q = query(
      collection(db, "users"),
      where("teamMemberStatus", "==", "Approved")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const members: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        members.push({ uid: doc.id, ...doc.data() });
      });
      setTeamMembers(members);
    });

    return () => unsubscribe();
  }, []);
  // const userPorfileImage = user.photoURL
  //   ? { uri: user.photoURL }
  //   : require("../assets/images/avatar.jpg");
  return (
    <GestureHandlerRootView style={styles.root}>
      <FlashList
        data={teamMembers}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.memberCard}>
            <Image
              style={styles.memberImage}
              source={{
                uri: item.photoURL
                  ? item.photoURL
                  : require("../assets/images/avatar.jpg"),
              }}
            />
            <Text style={styles.memberName}>{formatName(item.name)}</Text>
            <View style={styles.skillsContainer}>
              {item.skills.map((skill: string, index: number) => (
                <Text key={index} style={styles.skill}>
                  {skill}
                </Text>
              ))}
            </View>
            <Button
              textStyle={styles.btnText}
              style={styles.profileButton}
              onPress={() => openTeamMemberProfile(item.uid)}
            >
              See Profile
            </Button>
          </View>
        )}
        estimatedItemSize={160}
      />

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
        handleIndicatorStyle={{
          backgroundColor: Colors.alternative,
          width: 40,
          height: 5,
          borderRadius: 5,
        }}
        backgroundStyle={{
          backgroundColor: Colors.yellow,
        }}
        onClose={afterCloseResetContent}
      >
        <View style={styles.contentContainer}>{ContentComponent}</View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};
export default TeamMembers;

const styles = StyleSheet.create({
  root: {
    flex: 1,

    backgroundColor: Colors.alternative,
  },
  memberCard: {
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: Colors.yellow,
  },
  memberImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  memberName: {
    fontSize: 20,
    fontFamily: "lato-bold",
    marginVertical: 15,
    color: Colors.white,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 8,
  },
  skill: {
    backgroundColor: Colors.primaryBackground,
    color: Colors.yellow,
    fontWeight: "bold",
    fontFamily: "source-sans",
    letterSpacing: 1,
    padding: 5,
    borderRadius: 5,
    margin: 4,
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },

  profileButton: {
    padding: 10,
    backgroundColor: "#0E0D0D",
    borderRadius: 5,
    width: 150,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
  },
});
