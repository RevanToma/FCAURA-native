import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignIn from "./screens/SignIn";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from "react-redux";
import { userSlice } from "./store/user/userSelectors";

import SignUp from "./screens/SignUp";
import SetupNavigator from "./components/navigators/SetupNavigator";
import NotAuthenticatedNavigator from "./components/navigators/NotAuthNav";
import SignedInNavigator from "./components/navigators/SignedInNav";

export type NotAuthenticatedNavigatorProps = {
  Home: undefined;
  SignIn: undefined;
  TeamMembers: undefined;
  Chat?: undefined;
  Settings?: undefined;
  Authenticate?: undefined;
};

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();
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

const MainNavigator = () => {
  const { isSignedIn, user } = useSelector(userSlice);

  if (isSignedIn && user?.completedProfileSetup) {
    return <SignedInNavigator />;
  } else if (isSignedIn && !user?.completedProfileSetup) {
    return <SetupNavigator />;
  } else {
    return <NotAuthenticatedNavigator />;
  }
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans_Condensed-Medium.ttf"),
    "lato-bold": require("./assets/fonts/Lato-Bold.ttf"),
    "source-sans": require("./assets/fonts/SourceSans3-Medium.ttf"),
    "rubik-microbe": require("./assets/fonts/RubikMicrobe-Regular.ttf"),
  });

  useEffect(() => {
    async function hideSplash() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    hideSplash();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="light" />
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
