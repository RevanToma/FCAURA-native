import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import { useState } from "react";
import { Colors } from "../constants/Colors";

import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useAppDispatch } from "../utils/hooks/useDispatch";
import { signInUser } from "../store/user/userSlice";
import { useForm, Controller } from "react-hook-form";
import Button from "../components/common/Buttons/Button";
import Spinner from "react-native-loading-spinner-overlay";

export type FormData = {
  email: string;
  password: string;
};

const SignIn = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const { email, password } = data;
    try {
      await dispatch(signInUser({ email, password }));
    } catch (error: any) {
      Alert.alert("Login Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Spinner visible={isLoading} color={Colors.yellow} />;
  }
  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.header}>
          <Animated.Image
            entering={FadeInUp.duration(1000).springify()}
            source={require("../assets/images/FCAURA-Logo.png")}
          />
          <Text style={styles.headerText}>Sign in with email and password</Text>
        </View>
        <Animated.View
          entering={FadeInDown.duration(1000).springify()}
          style={styles.formView}
        >
          <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address" // To show email keyboard
                  />
                </View>
              )}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Not a valid email",
                },
              }}
            />

            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Password"
                  secureTextEntry
                  autoCapitalize="none"
                />
              )}
              name="password"
              rules={{ required: "Password is required" }}
            />
          </View>

          <Button onPress={handleSubmit(onSubmit)}>Sign in</Button>
        </Animated.View>
        <Text
          onPress={() => navigation.navigate("SignUp")}
          style={[styles.footertxt, { textAlign: "center", letterSpacing: 1 }]}
        >
          Don't have an account?
          <Text style={{ color: Colors.yellow }}> Sign up!</Text>
        </Text>

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
  input: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 7,
    fontSize: 16,
    textAlignVertical: "top",
    width: "80%",
    marginVertical: 10,
  },
  errorText: {
    color: Colors.error,
  },
});
