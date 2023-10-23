import { StyleSheet, Text, View, Pressable } from "react-native";

import { FC } from "react";
import { Colors } from "../../../constants/Colors";

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  style?: object;
  textStyle?: object;
};
const Button: FC<ButtonProps> = ({ children, onPress, style, textStyle }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btnContainer,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.btnText, textStyle]}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnContainer: {
    padding: 15,
    backgroundColor: Colors.green,
    borderRadius: 15,
    elevation: 3,
    margin: 15,
    width: 250,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  btnText: {
    fontFamily: "source-sans",
    fontSize: 20,
    color: Colors.white,
    letterSpacing: 1,
  },
});
