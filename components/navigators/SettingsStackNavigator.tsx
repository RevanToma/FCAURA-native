import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "../../screens/Settings";

import { Colors } from "../../constants/Colors";

import ChangeProfileInfo from "../../screens/ChangeProfileInfo";
import ChangeSkills from "../../screens/ChangeSkills";
import Dashboard from "../../screens/Dashboard";
import { auth } from "../../firebase/firebase.auth";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/userSelectors";

const Stack = createNativeStackNavigator();

const SettingsStackNavigator = () => {
  const currentUser = useSelector(selectUser);
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
        name="ChangeProfileInfo"
        component={ChangeProfileInfo}
        options={{ title: "Change Profile Info" }}
      />
      <Stack.Screen
        name="ChangeSkills"
        component={ChangeSkills}
        options={{ title: "Change / Add Skills" }}
      />
      {currentUser?.role === "Admin" && (
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: "Dashboard" }}
        />
      )}
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
