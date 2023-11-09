import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { FlashList } from "@shopify/flash-list";
import { formatName } from "../utils/helpers/Helpers";
import Button from "../components/common/Buttons/Button";
import { useBottomSheet } from "../utils/hooks/useBottomSheet";
import TeamMemberProfileCard from "../components/TeamMemberProfileCard/TeamMemberProfileCard";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DocumentData } from "firebase/firestore";
import { subscribeToTeamMembers } from "../firebase/firebase.subscribtion";
import ImageWithFallback from "../utils/helpers/ImageWithFallback";

const TeamMembers = ({ navigation }: any) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Team Members",
    });
  });
  const [teamMembers, setTeamMembers] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
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
    const unsubscribe = subscribeToTeamMembers((newMembers) => {
      setTeamMembers(newMembers);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <GestureHandlerRootView style={[styles.root, { justifyContent: "center" }]}>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.yellow} />
      ) : (
        <>
          <FlashList
            data={teamMembers}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) => (
              <View style={styles.memberCard}>
                <ImageWithFallback
                  uri={item.photoURL}
                  style={styles.memberImage}
                  iconSize={50}
                  iconColor="white"
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
            <BottomSheetScrollView style={styles.contentContainer}>
              {ContentComponent}
            </BottomSheetScrollView>
          </BottomSheet>
        </>
      )}
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
    backgroundColor: Colors.alternative,
  },
});
