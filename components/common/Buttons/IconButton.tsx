import { StyleSheet, Text, View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconButtonProps = {
  icon: typeof Ionicons.defaultProps.name;
  color: string;
  size: number;
};
const IconButton: React.FC<IconButtonProps> = ({ icon, color, size }) => {
  return (
    <Ionicons name={icon} size={size} color={color} style={styles.iconStyle} />
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
