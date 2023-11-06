import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from "react-redux";
import { userSlice } from "./store/user/userSelectors";

import SetupNavigator from "./components/navigators/SetupNavigator";
import NotAuthenticatedNavigator from "./components/navigators/NotAuthNav";
import SignedInNavigator from "./components/navigators/SignedInNav";

// const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

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
        {/* <QueryClientProvider client={queryClient}> */}
        <StatusBar style="light" />
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
        {/* </QueryClientProvider> */}
      </PersistGate>
    </Provider>
  );
}
