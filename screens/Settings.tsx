import { View, Text, StyleSheet } from "react-native";

import { Colors } from "../constants/Colors";
import Button from "../components/common/Buttons/Button";

import { useAppDispatch } from "../utils/hooks/useDispatch";
import { logOutUser } from "../store/user/userSlice";

const Settings = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
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
