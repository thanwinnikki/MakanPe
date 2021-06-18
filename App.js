import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import StartScreen from "./src/screens/StartScreen";
import Restaurant from "./src/screens/RestaurantDetails";
import SignupPage from "./src/screens/SignupPage";
import LoginPage from "./src/screens/LoginPage";
import HomeScreen from "./src/screens/HomeScreen";
import Profile from "./src/screens/ProfileScreen";
import Maps from "./src/components/Maps";
import Decision from "./src/screens/DecisionScreen";
import {
  TabNav,
  LoginStackScreen,
  noHeaderTitle,
} from "./src/components/Navigation";

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Login"
          component={LoginStackScreen}
          options={noHeaderTitle}
        />
        <RootStack.Screen
          name="BottomTab"
          component={TabNav}
          options={noHeaderTitle}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
