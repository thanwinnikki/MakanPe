import React, { useState, useRef } from "react";
import { CommonActions } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";

import * as Authentication from "../../api/auth";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordTextInput = useRef();

  const handleLogin = () => {
    Authentication.signIn(
      { email, password },
      (user) =>
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "Home",
              },
            ],
          })
        ),
      (error) => {
        return <Alert>{error}</Alert>;
      }
    );
  };

  const handleNoAcc = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "Home",
          },
        ],
      })
    );
  };

  const goCreateAcc = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/makan.png")} style={[styles.logoPic]} />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => passwordTextInput.current.focus()}
          blurOnSubmit={false}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          ref={passwordTextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity onPress={handleNoAcc}>
        <Text style={styles.forgotPwdButton}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInBtn} onPress={handleLogin}>
        <Text style={styles.loginButton}>Let's Eat!</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.createAccButton} onPress={goCreateAcc}>
          Create account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF5858",
    alignItems: "center",
    justifyContent: "center",
  },

  logoPic: {
    height: 200,
    width: 200,
    resizeMode: "stretch",
    marginBottom: 50,
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "flex-start",
  },

  TextInput: {
    height: 100,
    flex: 1,
    padding: 10,
  },

  loginButton: {
    fontSize: 15,
    fontWeight: "bold",
  },

  forgotPwdButton: {
    height: 30,
    marginBottom: 10,
    color: "white",
    fontSize: 15,
  },

  createAccButton: {
    height: 30,
    marginBottom: 10,
    color: "white",
    fontSize: 15,
  },

  signInBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: "salmon",
  },
});

export default LoginPage;
