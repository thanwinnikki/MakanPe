import React, { useState, useRef } from "react";
import { CommonActions } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import * as Authentication from "../../api/auth";

const SignupPage = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailTextInput = useRef();
  const passwordTextInput = useRef();

  const goBack = () => {
    navigation.goBack();
  };

  const handleRegister = () => {
    Authentication.createAccount(
      { name: username, email, password },
      (user) =>
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "Home",
                params: { name: user.displayName },
              },
            ],
          })
        ),
      (error) => {
        return <Alert>{error}</Alert>;
      }
    );
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/makan.png")} style={[styles.logoPic]} />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={username}
          placeholder="Enter Username"
          placeholderTextColor="#003f5c"
          onChangeText={setUsername}
          returnKeyType="next"
          onSubmitEditing={() => emailTextInput.current.focus()}
          blurOnSubmit={false}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          ref={emailTextInput}
          keyboardType="email-address"
          value={email}
          placeholder="Enter Email Here"
          placeholderTextColor="#003f5c"
          onChangeText={setEmail}
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

      <TouchableOpacity style={styles.signInBtn}>
        <Text style={styles.loginButton} onPress={handleRegister}>
          Create Account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgot_button} onPress={goBack}>
          Go Back
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

  forgot_button: {
    height: 30,
    marginBottom: 10,
    color: "white",
    fontSize: 11,
  },

  loginButton: {
    fontSize: 15,
    fontWeight: "bold",
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

export default SignupPage;
