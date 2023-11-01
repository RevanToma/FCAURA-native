import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useContext, useEffect } from "react";
import Button from "../components/common/Buttons/Button";
import { Colors } from "../constants/Colors";
import { AuthContext } from "../store/authContext";

const Review = ({ navigation }: any) => {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
    });
  }, [navigation]);

  const handleButton = () => {
    authCtx?.completeProfileSetup();
  };
  return (
    <ScrollView style={styles.root}>
      <View style={{ alignItems: "center", gap: 20, paddingVertical: 20 }}>
        <Image
          source={require("./../assets/images/FCAURA-Logo.png")}
          style={styles.image}
        />
        <ActivityIndicator size={100} color={Colors.yellow} />

        <View style={styles.textView}>
          <Text style={styles.text}>
            Thank you for your registration! Since you chose to register as a
            team member, your application will now be reviewed by an
            administrator. We appreciate your patience and will notify you as
            soon as your registration has been approved.
          </Text>
          <Text style={styles.text}>
            In the meantime, while you wait, you can explore the site,
            familiarize yourself with our team members, and take a look at
            upcoming matches.
          </Text>
        </View>
        <Button onPress={handleButton}>Explore the page</Button>
      </View>
    </ScrollView>
  );
};

export default Review;

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.alternative,
    flex: 1,
    gap: 20,
  },
  text: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: "source-sans",
    letterSpacing: 1,
    padding: 5,
  },
  image: {
    width: 150,
    height: 200,
  },
  textView: {
    paddingHorizontal: 20,
  },
});
