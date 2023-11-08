import { Image, StyleSheet, TextInput, View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import Button from "../common/Buttons/Button";
import { Controller, useForm } from "react-hook-form";

import { updateFirebaseUserEmail } from "../../firebase/firebase.utils";

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

  const handleSave = handleSubmit(async ({ email }) => {
    setIsLoading(true);

    try {
      await updateFirebaseUserEmail(email);

      setIsLoading(false);
      onClose();
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert("Error", error.message);
    }
  });

  return (
    <View style={styles.root}>
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
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="New email"
            autoCapitalize="none"
            keyboardType="email-address"
          />
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
    width: "80%",
    marginVertical: 10,
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
