import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../../screens/Settings";
import ChangeEmail from "../../screens/ChangeEmail";
import { Colors } from "../../constants/Colors";

const Stack = createNativeStackNavigator();

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsMain"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryBackground }, // Customize your header style
        headerTintColor: Colors.yellow, // Customize your header tint color
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="SettingsMain"
        component={Settings}
        options={{ title: "Settings" }}
      />
      <Stack.Screen
        name="ChangeEmail"
        component={ChangeEmail}
        options={{ title: "Change Email" }}
      />
      {/* <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ title: 'Change Password' }}
      />
      <Stack.Screen
        name="ChangeProfileInfo"
        component={ChangeProfileInfo}
        options={{ title: 'Change Profile Info' }}
      /> */}
      {/* <Stack.Screen
        name="ChangeSkills"
        component={ChangeSkills}
        options={{ title: 'Change/Add Skills' }}
      /> */}
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
