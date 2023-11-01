import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState } from "react";
import { Colors } from "../constants/Colors";
import Form from "../components/common/Form/Form";

import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useAppDispatch } from "../utils/hooks/useDispatch";
import { signInUser, signUpUser } from "../store/user/userSlice";

const SignIn = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    if (isSignUpMode) {
      try {
        await dispatch(signUpUser({ email, password }));
        setIsLoading(false);
      } catch (error: string | any) {
        setIsLoading(false);
        if (error.message === "EMAIL_EXISTS") {
          Alert.alert("Email already in use, please chose another one");
          return;
        } else {
          Alert.alert("An error occurred", error.message);
        }
      }
      setIsLoading(false);
    } else {
      try {
        await dispatch(signInUser({ email, password }));
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        Alert.alert("Login Error", error.message);
      }
    }
  };
  const toggleFormMode = () => {
    setIsSignUpMode((prevMode) => !prevMode);
  };
  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={Colors.yellow}
        style={{
          justifyContent: "center",
          height: "100%",
          backgroundColor: Colors.alternative,
        }}
      />
    );
  }
  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.header}>
          <Animated.Image
            entering={FadeInUp.duration(1000).springify()}
            source={require("../assets/images/FCAURA-Logo.png")}
            style={styles.image}
          />
          <Text style={styles.headerText}>Sign in with email and password</Text>
        </View>
        <Animated.View
          entering={FadeInDown.duration(1000).springify()}
          style={styles.formView}
        >
          <Form
            onSubmit={signIn}
            isSignUpMode={isSignUpMode}
            onToggleMode={toggleFormMode}
          />
        </Animated.View>

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

    marginVertical: 20,

    borderTopColor: "rgba(0,0,0,0.3)",
    borderTopWidth: 2,
  },
  footertxt: {
    color: Colors.white,
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
    marginVertical: 35,
  },
  formView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
