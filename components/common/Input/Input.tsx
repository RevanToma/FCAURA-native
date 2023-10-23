import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
} from "react-native";
import { Colors } from "../../../constants/Colors";
import { FC } from "react";

type inputProps = {
  label: string;
  keyboardType: KeyboardTypeOptions;
  secure: boolean;
  onUpdateValue: (text: string) => void;
  value: string | number;
  isInvalid: boolean;
};

const Input: FC<inputProps> = ({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={typeof value === "number" ? value.toString() : value}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    width: 350,

    padding: 20,
  },
  label: {
    color: "#A8A2A2",
    marginBottom: 4,
    fontFamily: "source-sans",
    fontWeight: "bold",
  },
  labelInvalid: {
    color: Colors.error,
  },
  input: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 7,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error,
  },
});
