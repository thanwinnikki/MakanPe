import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
