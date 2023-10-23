import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { Colors } from "../constants/Colors";
import Button from "../components/common/Buttons/Button";
import { AuthContext } from "../store/authContext";

const Settings = () => {
  const authCtx = useContext(AuthContext);

  const handleLogout = () => {
    authCtx?.logout();
  };
  return (
    <View style={styles.root}>
      <Text>Settings</Text>
      <Button onPress={handleLogout}>Log out</Button>
    </View>
  );
};

export default Settings;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.alternative,
  },
});
