import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type ReplyMessageBarProps = {
  clearReply: () => void;
  message: { text: string } | null;
};

const ReplyMessageBar = ({ clearReply, message }: ReplyMessageBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Ionicons name="arrow-undo-sharp" size={35} color="#1A96F2" />
      </View>

      <View style={styles.msgContainer}>
        <Text style={{ color: "#fff" }}>{message?.text}</Text>
      </View>

      <TouchableOpacity onPress={clearReply} style={styles.xBtn}>
        <Ionicons name="close-circle-outline" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};
export default ReplyMessageBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 8,
    backgroundColor: "#283238",

    height: 50,
  },
  msgContainer: {
    flex: 1,
  },
  icon: {
    borderRightWidth: 2,
    borderRightColor: "#1A96F2",
    marginHorizontal: 5,
  },
  xBtn: {
    padding: 4,
  },
});
