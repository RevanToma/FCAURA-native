import { View, Text, StyleSheet, Image } from "react-native";

import { Colors } from "../constants/Colors";
import Button from "../components/common/Buttons/Button";
import BottomSheet from "@gorhom/bottom-sheet";
import { useAppDispatch } from "../utils/hooks/useDispatch";
import { logOutUser } from "../store/user/userSlice";
import SettingsButtons from "../components/common/SettingsButtons/SettingsButtons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user/userSelectors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ChangeEmail from "../components/ChangeEmail-ChangePassword/ChangeEmail";
import { useBottomSheet } from "../utils/hooks/useBottomSheet";
import { formatName } from "../utils/helpers/Helpers";
import ChangePassword from "../components/ChangeEmail-ChangePassword/ChangePassword";

export type SettingsStackParamList = {
  SettingsMain: undefined;
  ChangeProfileInfo: undefined;
  ChangeSkills: undefined;
};

type SettingsScreenNavigationProp = NativeStackNavigationProp<
  SettingsStackParamList,
  "SettingsMain"
>;
export type SettingsProps = {
  navigation: SettingsScreenNavigationProp;
};
type SettingsScreenRoute = keyof SettingsStackParamList;

const Settings: React.FC<SettingsProps> = ({ navigation }) => {
  const {
    bottomSheetRef,
    closeBottomSheet,
    openBottomSheetWithContent,
    snapPoints,
    ContentComponent,
    afterCloseResetContent,
  } = useBottomSheet();

  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
  };
  const handleNavigationButton = (screen: SettingsScreenRoute) => {
    navigation.navigate(screen);
  };

  const openChangeEmail = () => {
    openBottomSheetWithContent(<ChangeEmail onClose={closeBottomSheet} />);
  };

  const openChangePassword = () => {
    openBottomSheetWithContent(<ChangePassword onClose={closeBottomSheet} />);
  };

  const userPorfileImage = user.photoURL
    ? { uri: user.photoURL }
    : require("../assets/images/avatar.jpg");
  return (
    <GestureHandlerRootView style={styles.root}>
      <View style={styles.hero}>
        <Image
          source={userPorfileImage}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
          }}
        />
        <View>
          <Text style={styles.heroEmail}>{user.email}</Text>
          <Text style={styles.txt}>{formatName(user.name)}</Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Text style={styles.txt}>Account</Text>
        <View>
          <SettingsButtons icon="mail-outline" onPress={openChangeEmail}>
            Change Email
          </SettingsButtons>
        </View>
        <View>
          <SettingsButtons
            icon="lock-closed-outline"
            onPress={openChangePassword}
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

      <Button
        onPress={handleLogout}
        style={{ backgroundColor: Colors.error, marginTop: 50 }}
      >
        Log out
      </Button>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        enablePanDownToClose={true}
        handleIndicatorStyle={{
          backgroundColor: Colors.alternative,
          width: 40,
          height: 5,
          borderRadius: 5,
        }}
        backgroundStyle={{
          backgroundColor: Colors.yellow,
        }}
        onClose={afterCloseResetContent}
      >
        <View style={styles.contentContainer}>{ContentComponent}</View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.alternative,

    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
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
  hero: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 20,
    backgroundColor: Colors.settignsBtn,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 20,
    width: 330,
  },
  heroEmail: {
    color: Colors.white,
    fontFamily: "source-sans",
    fontSize: 16,
    letterSpacing: 1,
  },
});
