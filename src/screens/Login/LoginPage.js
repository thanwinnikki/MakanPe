import React, { useState, useRef, useContext } from "react";
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

import { AuthContext } from "./context";

import * as Animatable from "react-native-animatable";
import MakanpeIcon from "../../assets/makanpe-icon";

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordTextInput = useRef();
  const { signIn } = useContext(AuthContext);

  const handleLogin = () => {
    signIn(
      { email, password },
      (user) => {
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
        console.log("User logged in");
      },
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
      <Animatable.View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingTop: 100,
          paddingBottom: 50,
        }}
        animation="fadeIn"
      >
        <Text style={styles.logo}>Makan</Text>
        <MakanpeIcon color={"white"} size={90} />
      </Animatable.View>
      <Animatable.View style={styles.subcontainer} animation="fadeInUpBig">
        <View style={styles.details}>
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

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Let's Eat!</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNoAcc}>
            <Text style={styles.forgotPwdButton}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.createAccButton} onPress={goCreateAcc}>
              Don't have an account? Create one!
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
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
    flex: 3,
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  details: {
    paddingTop: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontSize: 60,
    color: "white",
    fontWeight: "bold",
  },
  inputView: {
    backgroundColor: "#ECECEC",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginTop: 15,
    alignItems: "flex-start",
  },

  TextInput: {
    height: 100,
    flex: 1,
    padding: 10,
  },

  loginText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  loginButton: {
    width: "70%",
    borderRadius: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#FF5858",
  },
  forgotPwdButton: {
    height: 30,
    marginBottom: 5,
    color: "grey",
    fontSize: 15,
  },

  createAccButton: {
    height: 30,
    marginBottom: 15,
    color: "grey",
    fontSize: 15,
  },
});

export default LoginPage;
