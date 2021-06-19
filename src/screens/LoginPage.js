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
import MakanpeIcon from "../assets/makanpe-icon";

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
      <View style={{ flex: 1, flexDirection: "row", paddingTop: 200 }}>
        <Text style={styles.logo}>Makan</Text>
        <MakanpeIcon color={"white"} size={90} />
      </View>
      <View style={styles.subcontainer}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor="#958686"
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
            placeholderTextColor="#958686"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity onPress={handleNoAcc}>
          <Text style={styles.forgotPwdButton}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Let's Eat!</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.createAccButton} onPress={goCreateAcc}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
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
  subcontainer: {
    flex: 2,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  logo: {
    fontSize: 70,
    color: "white",
    fontWeight: "bold",
  },
  inputView: {
    backgroundColor: "#ECECEC",
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

  loginText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  loginButton: {
    width: "70%",
    borderRadius: 35,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
    backgroundColor: "#FF5858",
  },
  forgotPwdButton: {
    height: 30,
    marginBottom: 10,
    color: "grey",
    fontSize: 15,
  },

  createAccButton: {
    height: 30,
    marginBottom: 10,
    color: "grey",
    fontSize: 15,
  },
});

export default LoginPage;
