import { View, Text, StyleSheet } from "react-native";

import { Colors } from "../constants/Colors";
import Button from "../components/common/Buttons/Button";

import { useAppDispatch } from "../utils/hooks/useDispatch";
import { logOutUser } from "../store/user/userSlice";
import SettingsButtons from "../components/common/SettingsButtons/SettingsButtons";

const Settings = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
  };
  const handleNavigationButton = (screen: string) => {
    // navigation.navigate(e)
    navigation.navigate(screen);
    console.log(screen);
  };
  return (
    <View style={styles.root}>
      <View style={styles.btnContainer}>
        <Text style={styles.txt}>Account</Text>
        <View>
          <SettingsButtons
            icon="mail-outline"
            onPress={() => handleNavigationButton("ChangeEmail")}
          >
            Change Email
          </SettingsButtons>
        </View>
        <View>
          <SettingsButtons
            icon="lock-closed-outline"
            onPress={() => handleNavigationButton("changePassword")}
          >
            Change Password
          </SettingsButtons>

          <Text style={[styles.txt, { marginTop: 40 }]}>Profile</Text>
          <View style={{ marginVertical: 20 }}>
            <SettingsButtons
              icon="person-circle-outline"
              onPress={() => handleNavigationButton("ChangeProfileInfo")}
            >
              Change Profile info
            </SettingsButtons>
          </View>
          <View>
            <SettingsButtons
              icon="color-wand-outline"
              onPress={() => handleNavigationButton("ChangeSkills")}
            >
              Change / Add Skills
            </SettingsButtons>
          </View>
        </View>
      </View>

      <Button onPress={handleLogout}>Log out</Button>
    </View>
  );
};

export default Settings;

// icon="chevron-forward-outline"
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.alternative,

    alignItems: "center",
  },

  btnContainer: {
    gap: 20,
  },

  txt: {
    color: Colors.white,
    fontFamily: "lato-bold",
    fontSize: 20,
    letterSpacing: 1,
  },
  btnTxt: {
    fontSize: 17,
    letterSpacing: 1,
  },
});
