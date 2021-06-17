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
import TabNav from "./src/screens/TabNavigator";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signup" component={SignupPage} />
        <Stack.Screen name="HomeTab" component={HomeScreen} />
      </Stack.Navigator> */}
      <TabNav />
    </NavigationContainer>
  );
}
