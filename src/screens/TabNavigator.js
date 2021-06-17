import React from "react";
import { View, Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import MakanpeIcon from "../assets/makanpe-icon";

import HomeScreen from "./HomeScreen";
import Restaurant from "./RestaurantDetails";
import Maps from "../components/Maps";
import Profile from "./ProfileScreen";
import Decision from "./DecisionScreen";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const DecisionStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="Restaurant"
        component={Restaurant}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
        })}
      />
      <HomeStack.Screen
        name="Maps"
        component={Maps}
        options={({ route }) => ({
          headerBackTitleVisible: false,
          headerTitle: false,
        })}
      />
    </HomeStack.Navigator>
  );
}

function DecisionStackScreen() {
  return (
    <DecisionStack.Navigator>
      <DecisionStack.Screen name="Decision" component={Decision} />
    </DecisionStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
}

export default function TabNav() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "white",

          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesomeIcon
                icon={faHome}
                size={35}
                color={focused ? "#FF5858" : "#5B5B5B"}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Decision"
        component={DecisionStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MakanpeIcon color={focused ? "#FF5858" : "#5B5B5B"} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <FontAwesomeIcon
                icon={faUserCircle}
                size={35}
                color={focused ? "#FF5858" : "#5B5B5B"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
