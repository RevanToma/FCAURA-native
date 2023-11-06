import { StyleSheet, Text, View, Pressable } from "react-native";

import { FC } from "react";
import { Colors } from "../../../constants/Colors";
import IconButton from "./IconButton";

type ButtonProps = {
  children?: React.ReactNode;
  onPress: () => void;
  style?: object;
  textStyle?: object;
  disabled?: boolean;
  icon?: string;
  size?: number;
};
const Button: FC<ButtonProps> = ({
  children,
  onPress,
  style,
  textStyle,
  disabled,
  icon,
  size,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btnContainer,
        pressed && styles.pressed,
        style,
        disabled && { backgroundColor: "#7FB781" },
      ]}
      disabled={disabled}
    >
      <View style={styles.btnContent}>
        {icon && (
          <IconButton icon={icon} color="white" size={size ? size : 35} />
        )}
        <Text style={[styles.btnText, textStyle]}>{children}</Text>
      </View>
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
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  btnText: {
    fontFamily: "source-sans",
    fontSize: 25,
    color: Colors.white,
    letterSpacing: 1,
  },
  btnContent: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
});
