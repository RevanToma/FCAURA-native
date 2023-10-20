import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/Home";
import TeamMembers from "./screens/TeamMembers";
import Settings from "./screens/Settings";
import Chat from "./screens/Chat";
import IconButton from "./components/common/Buttons/IconButton";
import { Colors } from "./constants/Colors";
import { Platform, Image } from "react-native";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans_Condensed-Medium.ttf"),
    "lato-bold": require("./assets/fonts/Lato-Bold.ttf"),
    "soursce-sans": require("./assets/fonts/SourceSans3-Medium.ttf"),
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
    <>
      <StatusBar style="light" />
      <NavigationContainer>
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
              shadowColor: "#000",
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
                // <IconButton color={color} size={size} icon="home" />
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
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: ({ color, size }) => (
                <IconButton color={color} size={size} icon="settings" />
              ),
            }}
          />
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
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
