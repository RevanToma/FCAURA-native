import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState } from "react";
import { Colors } from "../constants/Colors";
import Button from "../components/common/Buttons/Button";

import { useSelector } from "react-redux";
import { selectUser } from "../store/user/userSelectors";
import { useAppDispatch } from "../utils/hooks/useDispatch";
import { completedProfileSetup } from "../store/user/userSlice";
import { saveToFirebase } from "../firebase/firebase.utils";

const Preview = ({ navigation }: any) => {
  const user = useSelector(selectUser);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();
  const openURL = (url: string) => {
    if (!url || url.trim() === "") {
      console.log("Instagram username is empty or not provided");
      return;
    }

    const formattedURL = `https://www.instagram.com/${url}`;

    Linking.canOpenURL(formattedURL).then((supported) => {
      if (supported) {
        Linking.openURL(formattedURL);
      } else {
        console.log("Don't know how to open URI: " + formattedURL);
      }
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await saveToFirebase(user.uid!, { ...user, completedProfileSetup: true });

      navigation.navigate("Review");

      setIsSubmitting(false);
      return;
    } catch (error) {
      console.log(error);
    }

    setIsSubmitting(false);
  };

  const userPorfileImage = user.photoURL
    ? { uri: user.photoURL }
    : require("../assets/images/avatar.jpg");

  return (
    <ScrollView style={styles.root}>
      <View style={{ alignItems: "center", padding: 15 }}>
        {isSubmitting ? (
          <ActivityIndicator
            size={100}
            color={Colors.yellow}
            style={{ alignItems: "center", justifyContent: "center" }}
          />
        ) : (
          <>
            <Text style={[styles.text, styles.header]}>
              This is how others will see your profile!
            </Text>
            <View style={styles.cardContainer}>
              <Image
                source={require("./../assets/images/FCAURA-Logo.png")}
                style={styles.logo}
              />
              <View style={styles.avatarContainer}>
                <Image source={userPorfileImage} style={styles.avatar} />
              </View>
              <Text style={[styles.text, styles.nameTxt]}>{user.name}</Text>
              <Text style={[styles.text, styles.positionTxt]}>
                {user.position}
              </Text>
              <Text style={[styles.text, styles.bioTxt]}> {user.bio}</Text>
              <TouchableOpacity onPress={() => openURL(user.instagram)}>
                <Image
                  source={require("./../assets/images/instagram.png")}
                  style={{ width: 50, marginTop: 10 }}
                />
              </TouchableOpacity>

              <View style={styles.skillListContainer}>
                {user.skills.map((skill: string, index: number) => (
                  <View key={index} style={styles.skillContainer}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View>
              <Button onPress={handleSubmit}>Create Profile</Button>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Preview;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.alternative,
    padding: 15,
  },
  cardContainer: {
    alignItems: "center",
    borderRadius: 20,
    borderBottomColor: Colors.yellow,
    borderBottomWidth: 40,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    gap: 10,
    padding: 20,
    marginTop: 20,
    backgroundColor: Colors.primaryBackground,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: "100%",
  },
  text: {
    color: Colors.white,
    fontSize: 20,
    textAlign: "center",
    letterSpacing: 1,
  },
  header: {
    fontFamily: "lato-bold",
    fontSize: 25,
    color: Colors.yellow,
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
  logo: {
    width: 70,
    height: 80,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: Colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 20,
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
});
