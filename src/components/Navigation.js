import React, { useContext } from "react";
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
import Main from "../screens/Home/Main/index";
import Restaurant from "../screens/Details/RestaurantDetails";
import Maps from "../screens/Details/Maps";
import Profile from "../screens/Profile/ProfileScreen";
import EditProfile from "../screens/Profile/EditProfile";
import MakanList from "../screens/Profile/MakanListScreen";
import addRestaurantScreen from "../screens/Profile/AddRestaurant";
import Decision from "../screens/Decision/Main/index";
import Login from "../screens/Login/LoginPage";
import Signup from "../screens/Login/SignupPage";
import NewAcc from "../screens/Login/NewAccPage";
import ChangePassword from "../screens/Login/ChangePassword";
import ChangeUserEmail from "../screens/Profile/ChangeUserEmail";
import ChangeUserPassword from "../screens/Profile/ChangeUserPassword";

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
        name="NewAcc"
        component={NewAcc}
        options={{
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerLeft: null,
        }}
      />
      <LoginStack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: "Change Password",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#FF5858",
          },
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
      <DecisionStack.Screen
        name="Decision"
        component={Decision}
        options={{
          headerTransparent: true,
          headerTitle: false,
          headerLeft: () => null,
        }}
      />
    </DecisionStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTransparent: true,
          headerTitle: false,
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: "Edit Profile",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#FF5858",
          },
        }}
      />
      <ProfileStack.Screen
        name="ChangeUserEmail"
        component={ChangeUserEmail}
        options={{
          title: "Change Email",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#FF5858",
          },
        }}
      />
      <ProfileStack.Screen
        name="ChangeUserPassword"
        component={ChangeUserPassword}
        options={{
          title: "Change Password",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#FF5858",
          },
        }}
      />
      <ProfileStack.Screen
        name="MakanList"
        component={MakanList}
        options={{
          title: "Makan List",
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "#FF5858",
          },
        }}
      />
      <ProfileStack.Screen
        name="Restaurant"
        component={Restaurant}
        options={{
          headerTransparent: true,
          headerTitle: false,
          headerLeft: () => null,
        }}
      />
      <ProfileStack.Screen
        name="Maps"
        component={Maps}
        options={{
          headerTransparent: true,
          headerTitle: false,
          headerLeft: () => null,
        }}
      />
      <ProfileStack.Screen
        name="AddRestaurant"
        component={addRestaurantScreen}
        options={{
          headerTransparent: true,
          headerTitle: false,
          headerLeft: () => null,
        }}
      />
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
            <View style={{ alignItems: "center" }}>
              <FontAwesomeIcon
                icon={faHome}
                size={30}
                color={focused ? "#FF5858" : "#5B5B5B"}
              />
              <Text style={{ color: focused ? "#FF5858" : "#5B5B5B" }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Decision"
        component={DecisionStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <MakanpeIcon color={focused ? "#FF5858" : "#5B5B5B"} size={30} />
              <Text style={{ color: focused ? "#FF5858" : "#5B5B5B" }}>
                Decide
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <FontAwesomeIcon
                icon={faUserCircle}
                size={30}
                color={focused ? "#FF5858" : "#5B5B5B"}
              />
              <Text style={{ color: focused ? "#FF5858" : "#5B5B5B" }}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
