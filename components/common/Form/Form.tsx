import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Input from "./../Input/Input";
import Button from "../Buttons/Button";
import { Colors } from "../../../constants/Colors";

interface FormProps {
  onSubmit: (email: string, password: string) => void;
  isSignUpMode?: boolean;
  onToggleMode?: () => void;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  isSignUpMode = false,
  onToggleMode = () => {},
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isInvalid = email === "" || !email.includes("@") || password === "";

  const handleAction = () => {
    if (isSignUpMode) {
      if (password !== confirmPassword) {
        Alert.alert("Passwords do not match");
        return;
      } else if (password.length < 6) {
        Alert.alert("Password must be at least 6 characters long");
        return;
      }
      onSubmit(email, password);
    } else {
      onSubmit(email, password);
    }
  };

  return (
    <View style={styles.root}>
      <Input
        label="Email"
        keyboardType="email-address"
        secure={false}
        onUpdateValue={setEmail}
        value={email}
        isInvalid={false}
      />
      <Input
        label="Password"
        keyboardType="default"
        secure={true}
        onUpdateValue={setPassword}
        value={password}
        isInvalid={false}
      />
      {isSignUpMode && (
        <Input
          label="Confirm Password"
          keyboardType="default"
          secure={true}
          value={confirmPassword}
          onUpdateValue={setConfirmPassword}
          isInvalid={false}
        />
      )}
      <Button onPress={handleAction} disabled={isInvalid}>
        {isSignUpMode ? "Sign Up" : "Sign In"}
      </Button>
      <Button
        onPress={onToggleMode}
        style={styles.createAccount}
        textStyle={styles.textStyle}
      >
        {isSignUpMode ? "Already have an account? Sign In" : "Create account"}
      </Button>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  root: {
    elevation: 3,
    backgroundColor: Colors.alternative,
    marginVertical: 15,
    width: "90%",
    borderRadius: 5,
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  createAccount: {
    backgroundColor: Colors.yellow,
  },
  textStyle: {
    color: Colors.alternative,
  },
});
