import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SetupProfile from "../../screens/SetupProfile";
import SetupSkills from "../../screens/SetupSkills";
import Review from "../../screens/Review";
import Preview from "../../screens/Preview";
import { Colors } from "../../constants/Colors";

//  type SetupNavigatorProps = {
//    SetupMain: undefined;
//    SetupProfile: undefined;
//    SetupSkills: undefined;
//    Preview: undefined;
//    Review: undefined;
//  };

const Stack = createNativeStackNavigator();

const SetupNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SetupMain"
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryBackground },
        headerTitleStyle: {
          color: Colors.yellow,
        },
        headerTintColor: Colors.yellow,
      }}
    >
      <Stack.Screen
        name="SetupProfile"
        component={SetupProfile}
        options={{
          headerTitle: "Setup Profile",
        }}
      />
      <Stack.Screen
        name="SetupSkills"
        component={SetupSkills}
        options={{
          headerTitle: "Setup Skills",
        }}
      />
      <Stack.Screen
        name="Review"
        component={Review}
        options={{
          headerTitle: "Review",
        }}
      />
      <Stack.Screen name="Preview" component={Preview} />
    </Stack.Navigator>
  );
};

export default SetupNavigator;
