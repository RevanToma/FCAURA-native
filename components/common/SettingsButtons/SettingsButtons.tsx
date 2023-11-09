import { StyleSheet, Text, View, Pressable } from "react-native";
import { Colors } from "../../../constants/Colors";
import IconButton from "../Buttons/IconButton";

type SettingsButtonsProps = {
  children?: React.ReactNode;
  onPress: () => void;
  icon?: string;
};

const SettingsButtons: React.FC<SettingsButtonsProps> = ({
  children,
  onPress,
  icon,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <View style={styles.btns}>
        <View style={{ flexDirection: "row", marginHorizontal: 10, gap: 40 }}>
          <IconButton icon={icon} size={20} color="white" />
          <Text style={styles.text}>{children}</Text>
        </View>
        <IconButton icon="chevron-forward-outline" size={20} color="white" />
      </View>
    </Pressable>
  );
};

export default SettingsButtons;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  btns: {
    flexDirection: "row",
    alignItems: "center",
    width: 330,
    justifyContent: "space-between",

    backgroundColor: Colors.settignsBtn,
    padding: 20,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontFamily: "lato-bold",
    color: Colors.white,
    letterSpacing: 1,
  },
});
