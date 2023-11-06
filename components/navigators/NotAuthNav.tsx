import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthFlowNavigator, NotAuthenticatedNavigatorProps } from "../../App";
import { Colors } from "../../constants/Colors";
import { Platform, Image } from "react-native";
import Home from "../../screens/Home";
import TeamMembers from "../../screens/TeamMembers";
import IconButton from "../common/Buttons/IconButton";

const Tab = createBottomTabNavigator<NotAuthenticatedNavigatorProps>();

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
              source={require("../../assets/images/FCAURA-Logo.png")}
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
        name="Authenticate"
        component={AuthFlowNavigator}
        options={{
          tabBarLabel: "Sign in", // or 'Auth' or whatever you want to label this tab
          tabBarIcon: ({ color, size }) => (
            <IconButton color={color} size={size} icon="log-in" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default NotAuthenticatedNavigator;
