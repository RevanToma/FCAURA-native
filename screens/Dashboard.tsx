import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../constants/Colors";
import {
  rejectOrApproveApplicants,
  subscribeToApplicants,
} from "../firebase/firebase.utils";
import { DocumentData } from "firebase/firestore";
import { FlashList } from "@shopify/flash-list";
import { formatName } from "../utils/helpers/Helpers";
import Button from "../components/common/Buttons/Button";
import TeamMemberProfileCard from "../components/TeamMemberProfileCard/TeamMemberProfileCard";
import { useBottomSheet } from "../utils/hooks/useBottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";

interface LoadingStates {
  [key: string]: boolean;
}

const Dashboard = () => {
  const [applicants, setApplicants] = useState<DocumentData[]>([]);

  const {
    bottomSheetRef,
    openBottomSheetWithContent,
    snapPoints,
    ContentComponent,
    afterCloseResetContent,
  } = useBottomSheet();

  const seeApplicantProfile = (uid: string) => {
    openBottomSheetWithContent(<TeamMemberProfileCard uid={uid} />);
  };

  useEffect(() => {
    const usubscribe = subscribeToApplicants(setApplicants);

    return () => usubscribe();
  }, []);

  const approveOrRejectApplicants = async (uid: string, status: string) => {
    try {
      await rejectOrApproveApplicants(uid, status);
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        "Error",
        "Something went wrong, please try again later",
        error.message
      );
    }
  };
  return (
    <GestureHandlerRootView style={styles.root}>
      <FlashList
        data={applicants}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) => (
          <View style={styles.memberCard}>
            <View style={styles.cardImgs}>
              <Image
                source={require("../assets/images/FCAURA-Logo.png")}
                style={styles.logo}
              />
              <View
                style={{
                  backgroundColor:
                    item.teamMemberStatus === "Approved" ? "green" : "red",
                  width: 50,
                  height: 50,
                  borderRadius: 50,
                }}
              />
            </View>

            <Image
              style={styles.memberImage}
              source={
                item.photoURL
                  ? { uri: item.photoURL }
                  : require("../assets/images/avatar.jpg")
              }
            />
            <Text style={styles.memberName}>{formatName(item.name)}</Text>
            <Button
              style={[styles.btn, { backgroundColor: Colors.yellow }]}
              textStyle={[styles.btnTxt, { color: Colors.alternative }]}
              onPress={() => seeApplicantProfile(item.uid)}
            >
              See Profile
            </Button>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Button
                textStyle={styles.btnTxt}
                style={[styles.rejectBtn, styles.btn]}
                onPress={() => approveOrRejectApplicants(item.uid, "Rejected")}
              >
                Reject
              </Button>
              <Button
                style={styles.btn}
                textStyle={styles.btnTxt}
                onPress={() => approveOrRejectApplicants(item.uid, "Approved")}
              >
                Approve
              </Button>
            </View>
          </View>
        )}
        estimatedItemSize={100}
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
    </GestureHandlerRootView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  root: { backgroundColor: Colors.alternative, flex: 1 },
  memberImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  memberName: {
    fontSize: 20,
    fontFamily: "lato-bold",
    marginVertical: 15,
    color: "#fff",
  },
  memberCard: {
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: Colors.yellow,
  },
  rejectBtn: {
    backgroundColor: Colors.error,
  },
  btnTxt: {
    fontSize: 19,
  },
  btn: {
    width: 150,
  },
  logo: {
    width: 50,
    height: 60,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.alternative,
  },
  cardImgs: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});
