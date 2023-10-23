import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Input from "./../Input/Input";
import Button from "../Buttons/Button";
import { Colors } from "../../../constants/Colors";

const Form: React.FC<{
  onSubmit: (email: string, password: string) => void;
}> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    onSubmit(email, password);
  };
  const handleSignUp = () => {
    onSubmit(email, password);
  };

  return (
    <View style={styles.root}>
      <Input
        label="Email"
        keyboardType="email-address"
        secure={false}
        onUpdateValue={setEmail}
        value={email}
        isInvalid={false} // You can add email validation logic to determine this value
      />
      <Input
        label="Password"
        keyboardType="default"
        secure={true}
        onUpdateValue={setPassword}
        value={password}
        isInvalid={false} // You can add password validation logic to determine this value
      />
      <Button onPress={handleSignIn}>Logga in</Button>
      <Button
        onPress={handleSignUp}
        style={styles.createAccount}
        textStyle={styles.textStyle}
      >
        Skapa Konto
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
    width: "100%",
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
