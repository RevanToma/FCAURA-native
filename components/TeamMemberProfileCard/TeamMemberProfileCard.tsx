import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { fetchUserFromFirebase } from "../../firebase/firebase.utils";

import { DocumentData } from "firebase/firestore";
import { Colors } from "../../constants/Colors";
import { formatName, openURL } from "../../utils/helpers/Helpers";
import ImageWithFallback from "../../utils/helpers/ImageWithFallback";
import Spinner from "react-native-loading-spinner-overlay";

type Props = {
  onClose?: () => void;
  uid: string;
};

const TeamMemberProfileCard: React.FC<Props> = ({ uid }) => {
  const [profileData, setProfileData] = useState<DocumentData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async (uid: string) => {
      const user = await fetchUserFromFirebase(uid);
      if (user) {
        setProfileData(user);
        setLoading(false);
      }
    };
    fetchProfile(uid);
  }, []);

  // const userPorfileImage = profileData?.photoURL
  //   ? { uri: profileData?.photoURL }
  //   : require("../../assets/images/avatar.jpg");

  return (
    <View style={styles.root}>
      {loading ? (
        <Spinner visible={loading} color={Colors.yellow} />
      ) : (
        <View style={styles.cardContainer}>
          <Image
            source={require("../../assets/images/FCAURA-Logo.png")}
            style={styles.logo}
          />
          <View style={styles.avatarContainer}>
            <ImageWithFallback
              uri={profileData?.photoURL}
              style={styles.avatar}
              iconSize={50}
              iconColor="white"
            />
          </View>
          <Text style={[styles.text, styles.nameTxt]}>
            {formatName(profileData?.name)}
          </Text>
          <Text style={[styles.text, styles.positionTxt]}>
            {profileData?.position}
          </Text>
          <Text style={[styles.text, styles.bioTxt]}> {profileData?.bio}</Text>
          <TouchableOpacity onPress={() => openURL(profileData?.instagram)}>
            <Image
              source={require("../../assets/images/instagram.png")}
              style={{ width: 50 }}
            />
          </TouchableOpacity>

          <View style={styles.skillListContainer}>
            {profileData?.skills.map((skill: string, index: number) => (
              <View key={index} style={styles.skillContainer}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default TeamMemberProfileCard;

const styles = StyleSheet.create({
  root: {
    flex: 1,

    backgroundColor: Colors.alternative,
  },
  logo: {
    width: 60,
    height: 70,
    alignSelf: "flex-start",
  },
  cardContainer: {
    alignItems: "center",
    borderRadius: 20,
    borderBottomColor: Colors.yellow,
    borderBottomWidth: 30,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    gap: 10,
    padding: 20,
    marginTop: 20,
    marginHorizontal: 25,
    backgroundColor: Colors.primaryBackground,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: Colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 15,
  },
  skillListContainer: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    justifyContent: "center",
  },
  skillContainer: {
    marginVertical: 3,
    padding: 10,
    backgroundColor: Colors.alternative,
    borderRadius: 10,
  },
  skillText: {
    color: Colors.yellow,
    fontSize: 16,
    fontFamily: "lato-bold",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  bioTxt: {
    fontFamily: "source-sans",
    fontSize: 18,
  },
  positionTxt: {
    color: Colors.yellow,
  },
  nameTxt: {
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: Colors.white,
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 1,
  },
});
