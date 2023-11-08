import { Image, StyleSheet, TextInput, View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import Button from "../common/Buttons/Button";
import { Controller, useForm } from "react-hook-form";

import {
  reAuthenticateUser,
  updateFirebaseUserEmail,
} from "../../firebase/firebase.utils";
import { auth } from "../../firebase/firebase.auth";
import ReauthModal from "../../utils/helpers/ReauthModal";
import { Ionicons } from "@expo/vector-icons";
import { stylesObj } from "../../constants/Colors";
type ChangeEmailProps = {
  onClose: () => void;
};
type ChangeEmailFormData = {
  email: string;
};

const ChangeEmail: React.FC<ChangeEmailProps> = ({ onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChangeEmailFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [isReauthModalVisible, setIsReauthModalVisible] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");

  const handleReauthentication = async (password: string) => {
    setIsLoading(true);
    try {
      const user = auth.currentUser!;
      await reAuthenticateUser({ user, password, newEmail: pendingEmail });
      setIsLoading(false);
      onClose();
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert("Reauthentication Error", error.message);
    }

    setIsReauthModalVisible(false);
  };
  const handleSave = handleSubmit(async ({ email }) => {
    setIsLoading(true);

    try {
      await updateFirebaseUserEmail(email);

      setIsLoading(false);
      onClose();
    } catch (error: any) {
      if (error.message === "Firebase: Error (auth/requires-recent-login).") {
        setPendingEmail(email);
        setIsReauthModalVisible(true);
      }

      setIsLoading(false);
      // Alert.alert("Error", error.message);
    }
  });

  return (
    <View style={stylesObj.root}>
      <Image
        source={require("../../assets/changeEmail.png")}
        style={styles.image}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="New email"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {isValid && (
              <Ionicons
                name="checkmark-circle-outline"
                color={Colors.green}
                size={25}
                style={{ position: "absolute", right: 0, marginRight: 10 }}
              />
            )}
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

      <ReauthModal
        isVisible={isReauthModalVisible}
        onConfirm={handleReauthentication}
        onCancel={() => setIsReauthModalVisible(false)}
      />

      <Button onPress={handleSave} style={styles.btn} isLoading={isLoading}>
        Save
      </Button>
    </View>
  );
};

export default ChangeEmail;

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.alternative,
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 250,
    marginVertical: 20,
  },
  input: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 7,
    fontSize: 16,
    textAlignVertical: "top",
    width: "100%",
    marginVertical: 10,
  },
  inputView: {
    width: "80%",
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    alignSelf: "flex-start",
    marginLeft: 45,
    marginTop: 10,
    color: "#CC6E00",
    fontWeight: "bold",
    fontSize: 16,
  },
  btn: {
    borderRadius: 7,
    width: "80%",
  },
});
