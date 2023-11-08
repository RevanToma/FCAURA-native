import { useState } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Buttons/Button";

type ReauthProps = {
  isVisible: boolean;
  onConfirm: (password: string) => void;
  onCancel: () => void;
};

const ReauthModal = ({ isVisible, onConfirm, onCancel }: ReauthProps) => {
  const [password, setPassword] = useState("");

  const isValid = password.toString().trim().length >= 8;

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.root}>
        <Text style={styles.text}>
          Please enter ur current password to confirm.
        </Text>
        <Input
          label="Current password"
          keyboardType="default"
          secure={true}
          placeholder="Enter your password"
          onUpdateValue={setPassword}
          value={password}
          isInvalid={!isValid}
        />
        <Button style={styles.btn} onPress={() => onConfirm(password)}>
          Confirm
        </Button>
        <Button style={[styles.btn, styles.cancel]} onPress={onCancel}>
          Cancel
        </Button>
      </View>
    </Modal>
  );
};

export default ReauthModal;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
  },
  input: {
    height: 100,
    backgroundColor: "white",
    width: "100%",
  },
  text: {
    color: "white",
    fontSize: 20,
    width: "70%",
    textAlign: "center",
    letterSpacing: 1,
    fontFamily: "lato-bold",
  },
  btn: {
    borderRadius: 7,
  },
  cancel: {
    backgroundColor: "red",
  },
});
