import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faUserCircle,
  faArrowCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import MakanpeIcon from "../assets/makanpe-icon";

import HomeScreen from "../screens/Home/HomeScreen";
import Main from "../screens/Home/Main/index"
import Restaurant from "../screens/Details/RestaurantDetails";
import Maps from "../screens/Details/Maps";
import Profile from "../screens/Profile/ProfileScreen";
import Decision from "../screens/Decision/DecisionScreen";
import Login from "../screens/Login/LoginPage";
import Signup from "../screens/Login/SignupPage";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const DecisionStack = createStackNavigator();
const LoginStack = createStackNavigator();

export const noHeaderTitle = {
  headerBackTitleVisible: false,
  headerTitle: false,
  headerTransparent: true,
};

export function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={noHeaderTitle}
      />
      <LoginStack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerLeft: null,
        }}
      />
      <LoginStack.Screen
        name="Home"
        component={TabNav}
        options={noHeaderTitle}
      />
    </LoginStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Main}
        options={{
          headerTransparent: true,
          headerTitle: false,
          headerLeft: () => null,
        }}
      />
      <HomeStack.Screen
        name="Restaurant"
        component={Restaurant}
        options={{
          headerTransparent: true,
          headerTitle: false,
          headerLeft: () => null,
        }}
      />
      <HomeStack.Screen
        name="Maps"
        component={Maps}
        options={{
          headerTransparent: true,
          headerTitle: false,
          headerLeft: () => null,
        }}
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

export function TabNav() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "white",

          height: 50,
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
                size={focused ? 40 : 30}
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
              <MakanpeIcon
                color={focused ? "#FF5858" : "#5B5B5B"}
                size={focused ? 40 : 30}
              />
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
                size={focused ? 40 : 30}
                color={focused ? "#FF5858" : "#5B5B5B"}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
