import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
} from "react-native";
import { Colors } from "../../../constants/Colors";
import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";

type inputProps = {
  label: string;
  keyboardType: KeyboardTypeOptions;
  secure?: boolean;
  onUpdateValue: (text: string) => void;
  value: string | number;
  isInvalid?: boolean;
  multiline?: boolean;
  errorText?: string;
};

const Input: FC<inputProps> = ({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  multiline,
  errorText,
}) => {
  return (
    <View style={styles.inputContainer}>
      {isInvalid ? (
        <View style={styles.invalidView}>
          <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
            {label}
          </Text>
          <Text style={styles.invalidLabelText}>
            ({errorText ? errorText : ""})
          </Text>
        </View>
      ) : (
        <View style={styles.validLabel}>
          <Text style={styles.label}>{label}</Text>
          <Ionicons
            name="checkmark-circle-outline"
            color={Colors.green}
            size={25}
          />
        </View>
      )}

      <TextInput
        multiline={multiline}
        numberOfLines={multiline ? 10 : 1}
        style={styles.input}
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
    color: Colors.yellow,
    marginBottom: 4,
    fontFamily: "source-sans",
    fontWeight: "bold",
    fontSize: 20,
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
  validLabel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  invalidView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  invalidLabelText: {
    color: Colors.error,
  },
});
