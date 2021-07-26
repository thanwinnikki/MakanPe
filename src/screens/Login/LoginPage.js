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

export default function LoginPage({ navigation }) {
  const [data, setData] = useState({
    // local state
    email: "",
    password: "",
    isValidUser: true,
    isValidPassword: true,
  });
  const { signIn, signInAnon } = useContext(AuthContext); // user sign in methods
  const passwordTextInput = useRef();

  // validate user sign in and navigate to home screen
  const handleLogin = () => {
    signIn(
      { email: data.email, password: data.password },
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
        switch (error.code) {
          case "auth/wrong-password":
            Alert.alert(
              "Invalid Login!",
              "Your email or password is incorrect!",
              [{ text: "ok" }]
            );
            return console.log(error.code);
          case "auth/invalid-email":
            Alert.alert(
              "Invalid Login!",
              "Your email or password is incorrect!",
              [{ text: "ok" }]
            );
            return console.log(error.code);
        }
        Alert.alert(error.message);
        return console.log(error.code);
      }
    );
  };

  const handleAnon = () => {
    signInAnon(
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
        console.log("Anon logged in");
      },
      (error) => {
        return console.log(error);
      }
    );
  };

  // validate email
  const handleValidUser = (val) => {
    if (val.trim().length > 0) {
      setData({
        ...data,
        email: val,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        isValidUser: false,
      });
    }
  };

  // validate password
  const handleValidPassword = (val) => {
    if (val.trim().length >= 6) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
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
              autoCapitalize="none"
              returnKeyType="next"
              onChangeText={(val) => handleValidUser(val)}
              onSubmitEditing={() => passwordTextInput.current.focus()}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
              blurOnSubmit={false}
            />
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{ color: "red" }}>Email cannot be empty.</Text>
            </Animatable.View>
          )}
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              ref={passwordTextInput}
              placeholder="Password"
              placeholderTextColor="#958686"
              onChangeText={(val) => handleValidPassword(val)}
              autoCapitalize="none"
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Sign In!</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.guestButton} onPress={handleAnon}>
            <Text style={styles.guestText}>Try as a guest!</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <Text style={styles.forgotPwdButton}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text
              style={styles.createAccButton}
              onPress={() => navigation.navigate("Signup")}
            >
              Don't have an account? Create one!
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF5858",
    alignItems: "center",
    justifyContent: "center",
  },
  subcontainer: {
    flex: 4,
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
    margin: 10,
    backgroundColor: "#FF5858",
  },
  guestText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#FF5858",
  },
  guestButton: {
    width: "70%",
    borderRadius: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderColor: "#FF5858",
    borderWidth: 2,
    backgroundColor: "white",
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
