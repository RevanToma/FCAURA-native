import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import Form from "../components/common/Form/Form";

const SignIn = () => {
  const signIn = (email: string, password: string) => {
    console.log("Email:", email, "Password:", password);
  };
  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={require("../assets/images/FCAURA-Logo.png")}
            style={styles.image}
          />
          <Text style={styles.headerText}>Logga in med email och lösenord</Text>
        </View>

        <View>
          <Form onSubmit={signIn} />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footertxt}>eller logga in med</Text>
          <Pressable>
            <Image source={require("../assets/images/google.png")} />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.alternative,
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
  },
  image: {
    // aspectRatio: 1,
  },
  header: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  headerText: {
    color: Colors.white,
    fontFamily: "lato-bold",
    fontSize: 25,
    marginTop: 20,
    letterSpacing: 1,
    width: "60%",
    textAlign: "center",
  },
  footer: {
    alignItems: "center",

    flex: 1,
    gap: 20,
    marginVertical: 20,

    borderTopColor: "rgba(0,0,0,0.3)",
    borderTopWidth: 2,
  },
  footertxt: {
    color: Colors.white,
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
  },
});
