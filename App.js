import React, { useMemo, useReducer, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  TabNav,
  LoginStackScreen,
  noHeaderTitle,
} from "./src/components/Navigation";
import * as Authentication from "./api/auth";
import { AuthContext } from "./src/components/context";

const RootStack = createStackNavigator();

export default function App() {
  const initialLoginState = {
    isLoading: true,
    userId: null,
    username: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "GET_USERID":
        return {
          ...prevState,
          userId: action.userId,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          username: action.username,
          userId: action.userId,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          username: null,
          userId: null,
          isLoading: false,
        };
      case "SIGNUP":
        return {
          ...prevState,
          username: action.username,
          userId: action.userId,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: ({ email, password }, onSuccess, onError) => {
      Authentication.signIn({ email, password }, onSuccess, onError);
      const userName = Authentication.getCurrentUserName();
      const userId = Authentication.getCurrentUserId();
      dispatch({ type: "LOGIN", userId: userId, username: userName });
    },
    signOut: (onSuccess, onError) => {
      Authentication.signOut(onSuccess, onError);
      dispatch({ type: "LOGOUT" });
    },
    signUp: ({ name, email, password }, onSuccess, onError) => {
      Authentication.createAccount(
        { name, email, password },
        onSuccess,
        onError
      );
      const userName = Authentication.getCurrentUserName();
      const userId = Authentication.getCurrentUserId();
      dispatch({ type: "SIGNUP", userId: userId, username: userName });
    },
  }));

  useEffect(() => {
    setTimeout(async () => {
      let userId;
      userId = null;
      try {
        userId = Authentication.getCurrentUserId();
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: "GET_USERID", userId: userId });
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userId !== null ? <TabNav /> : <LoginStackScreen />}
        {/* <RootStack.Navigator>
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
      </RootStack.Navigator> */}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
