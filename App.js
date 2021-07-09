import React, { useMemo, useReducer, useEffect } from "react";
import { StyleSheet, Text, View, Button, LogBox } from "react-native";
import { NavigationContainer, StackActions } from "@react-navigation/native";

import {
  TabNav,
  LoginStackScreen,
  noHeaderTitle,
} from "./src/components/Navigation";

import * as Authentication from "./api/auth";
import SplashScreen from "./src/screens/Login/SplashScreen";

import { AuthContext } from "./src/screens/Login/context";

// import useProfileState from "./src/screens/Profile/UserContext/useProfileState";
// import { UserContext } from "./src/screens/Profile/UserContext/context";

LogBox.ignoreLogs(["Setting a timer"]);

export default function App() {
  const initialLoginState = {
    isLoading: true,
    userId: null,
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
          userId: action.userId,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userId: null,
          isLoading: false,
        };
      case "SIGNUP":
        return {
          ...prevState,
          userId: action.userId,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({
    signIn: ({ email, password }, onSuccess, onError) => {
      Authentication.signIn({ email, password }, onSuccess, onError);
      const userId = Authentication.getCurrentUserId();
      dispatch({ type: "LOGIN", userId: userId });
    },
    signOut: (onSuccess, onError) => {
      Authentication.signOut(onSuccess, onError);
      dispatch({ type: "LOGOUT" });
    },
    signUp: ({ email, password }, onSuccess, onError) => {
      Authentication.createAccount({ email, password }, onSuccess, onError);
      const userId = Authentication.getCurrentUserId();
      dispatch({ type: "SIGNUP", userId: userId });
    },
    signinAnon: () => {
      Authentication.signInAnon(onSuccess, onError);
      const userId = Authentication.getCurrentUserId();
      dispatch({ type: "LOGIN", userId: userId });
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
    }, 2200);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{ flex: 1 }}>
        <SplashScreen />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userId !== null ? <TabNav /> : <LoginStackScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
