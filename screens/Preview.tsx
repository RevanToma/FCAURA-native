import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useContext, useState } from "react";
import { useUserProfile } from "../utils/hooks/useUserProfile";
import { Colors } from "../constants/Colors";
import Button from "../components/common/Buttons/Button";
import { AuthContext } from "../store/authContext";
import { saveToFirebase } from "../firebase/firebase";

const Preview = ({ navigation }: any) => {
  const { data: profile, isLoading, isError } = useUserProfile();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const authCtx = useContext(AuthContext);
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
      if (profile.teamMember) {
        navigation.navigate("Review");
        setIsSubmitting(false);
        return;
      }
      await saveToFirebase(authCtx?.token!, profile);
      authCtx?.completeProfileSetup();
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(false);
  };
  return (
    <ScrollView style={styles.root}>
      <View style={{ alignItems: "center", padding: 15 }}>
        <Text style={[styles.text, styles.header]}>
          This is how others will see your profile!
        </Text>
        <View style={styles.cardContainer}>
          <Image
            source={require("./../assets/images/FCAURA-Logo.png")}
            style={styles.logo}
          />
          <View style={styles.avatarContainer}>
            <Image
              source={require("./../assets/images/avatar.jpg")}
              style={styles.avatar}
            />
          </View>
          <Text style={[styles.text, styles.nameTxt]}>{profile.name}</Text>
          <Text style={[styles.text, styles.positionTxt]}>
            {profile.position}
          </Text>
          <Text style={[styles.text, styles.bioTxt]}> {profile.bio}</Text>
          <TouchableOpacity onPress={() => openURL(profile.instagram)}>
            <Image
              source={require("./../assets/images/instagram.png")}
              style={{ width: 50, marginTop: 10 }}
            />
          </TouchableOpacity>

          <View style={styles.skillListContainer}>
            {profile.skills.map((skill: string, index: number) => (
              <View key={index} style={styles.skillContainer}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>
        <View>
          {isSubmitting ? (
            <ActivityIndicator color={Colors.yellow} size="large" />
          ) : (
            <>
              <Button onPress={handleSubmit}>Create Profile</Button>
            </>
          )}
        </View>
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
    width: 140,
    height: 140,
    borderWidth: 2,

    borderRadius: 70,
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
