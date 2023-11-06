import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../../screens/SignIn";
import SignUp from "../../screens/SignUp";

const AuthStack = createNativeStackNavigator();

export const AuthFlowNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};
