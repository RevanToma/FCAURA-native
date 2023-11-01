import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import TeamMembers from "./screens/TeamMembers";
import Settings from "./screens/Settings";
import Chat from "./screens/Chat";
import IconButton from "./components/common/Buttons/IconButton";
import { Colors } from "./constants/Colors";
import { Platform, Image, ActivityIndicator } from "react-native";
import SignIn from "./screens/SignIn";

import SetupProfile from "./screens/SetupProfile";
import SetupSkills from "./screens/SetupSkills";
import Preview from "./screens/Preview";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Review from "./screens/Review";
import { useAppDispatch } from "./utils/hooks/useDispatch";

import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from "react-redux";
import { selectUser, userSlice } from "./store/user/userSelectors";
import { fetchUserFromFirebase } from "./firebase/firebase";
import { fetchUser } from "./store/user/userSlice";

type NotAuthenticatedNavigatorProps = {
  Home: undefined;
  SignIn: undefined;
  TeamMembers: undefined;
  Chat?: undefined;
  Settings?: undefined;
};
type SetupNavigatorProps = {
  SetupProfile: undefined;
  SetupSkills: undefined;
  Preview: undefined;
  Review: undefined;
};

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator<SetupNavigatorProps>();
const Tab = createBottomTabNavigator<NotAuthenticatedNavigatorProps>();

const SetupNavigator = () => {
  return (
    <Stack.Navigator
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

const NotAuthenticatedNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.yellow,
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: Colors.primaryBackground,
          borderTopWidth: 0,
          elevation: 2,
          height: Platform.OS === "ios" ? 90 : 60,
          paddingBottom: Platform.OS === "ios" ? 25 : 10,
          paddingTop: 5,
          shadowColor: "#1e1e1e",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: "lato-bold",
        },
        headerStyle: { backgroundColor: Colors.primaryBackground },
        headerTitleStyle: {
          color: Colors.yellow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("./assets/images/FCAURA-Logo.png")}
              style={{
                height: 30,
                width: 30,
                resizeMode: "cover",
                opacity: focused ? 1 : 0.3,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TeamMembers"
        component={TeamMembers}
        options={{
          tabBarLabel: "Members",
          tabBarIcon: ({ color, size }) => (
            <IconButton color={color} size={size} icon="people" />
          ),
        }}
      />
      <Tab.Screen
        name="SignIn"
        component={SignIn}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconButton color={color} size={size} icon="log-in" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const SignedInNavigator = () => {
  const currentUser = useSelector(selectUser);
  const [memberStatus, setMemberStatus] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await fetchUserFromFirebase(currentUser.uid!);
      setMemberStatus(user?.teamMemberStatus);
    };

    fetchUser();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.yellow,
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: Colors.primaryBackground,
          borderTopWidth: 0,
          elevation: 2,
          height: Platform.OS === "ios" ? 90 : 60,
          paddingBottom: Platform.OS === "ios" ? 25 : 10,
          paddingTop: 5,
          shadowColor: "#1e1e1e",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontFamily: "lato-bold",
        },
        headerStyle: { backgroundColor: Colors.primaryBackground },
        headerTitleStyle: {
          color: Colors.yellow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("./assets/images/FCAURA-Logo.png")}
              style={{
                height: 30,
                width: 30,
                resizeMode: "cover",
                opacity: focused ? 1 : 0.3,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TeamMembers"
        component={TeamMembers}
        options={{
          tabBarLabel: "Members",
          tabBarIcon: ({ color, size }) => (
            <IconButton color={color} size={size} icon="people" />
          ),
        }}
      />
      {memberStatus === "Approved" && (
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarIcon: ({ color, size }) => (
              <IconButton
                color={color}
                size={size}
                icon="chatbubble-ellipses"
              />
            ),
          }}
        />
      )}

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconButton color={color} size={size} icon="settings" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const MainNavigator = () => {
  const { isSignedIn, user } = useSelector(userSlice);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user.uid) {
      dispatch(fetchUser(user.uid));
    }
  }, []);

  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.yellow} />;
  }

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
