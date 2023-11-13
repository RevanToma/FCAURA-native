import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/userSelectors";
import { useState } from "react";
import { ActivityIndicator, Platform, Image } from "react-native";
import { Colors } from "../../constants/Colors";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../screens/Home";
import TeamMembers from "../../screens/TeamMembers";
import IconButton from "../common/Buttons/IconButton";
import Chat from "../../screens/Chat";
import SettingsStackNavigator from "./SettingsStackNavigator";
import { NotAuthenticatedNavigatorProps } from "../../types";
import Spinner from "react-native-loading-spinner-overlay";

const Tab = createBottomTabNavigator<NotAuthenticatedNavigatorProps>();

const SignedInNavigator = () => {
  const currentUser = useSelector(selectUser);

  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <Spinner visible={isLoading} color={Colors.yellow} />;
  }
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
      {currentUser.teamMemberStatus === "Approved" && (
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
        component={SettingsStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IconButton color={color} size={size} icon="settings" />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default SignedInNavigator;
