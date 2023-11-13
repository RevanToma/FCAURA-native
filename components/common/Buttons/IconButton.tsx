import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconButtonProps = {
  icon: typeof Ionicons.defaultProps.name;
  color: string;
  size: number;
  onPress?: () => void;

  style?: any;
};
const IconButton: React.FC<IconButtonProps> = ({
  icon,
  color,
  size,
  onPress,
  style,
}) => {
  return (
    <Ionicons
      onPress={onPress}
      name={icon}
      size={size}
      color={color}
      style={[styles.iconStyle, style]}
    />
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  iconStyle: {},
});
