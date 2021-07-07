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
import { UserContext } from "../Profile/UserContext/context";
import * as db from "../../../api/database";
import * as Auth from "../../../api/auth";

import * as Animatable from "react-native-animatable";
import MakanpeIcon from "../../assets/makanpe-icon";

export default function LoginPage({ navigation }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    isValidUser: true,
    isValidPassword: true,
  });
  const passwordTextInput = useRef();
  const { signIn, signInAnon } = useContext(AuthContext);
  const { userData, actions } = useContext(UserContext);

  const updateUserData = () => {
    const curUserId = Auth.getCurrentUserId();
    const email = data.email;
    const user = db.getUserProfile(curUserId);
    actions({
      type: "setUserData",
      payload: {
        ...userData,
        email: email,
        fname: user.fname,
        lname: user.lname,
      },
    });
  };

  const handleLogin = () => {
    signIn(
      { email: data.email, password: data.password },
      (user) => {
        updateUserData();
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
        }
        Alert.alert("Error!", "This error is not handled yet.", [
          { text: "ok" },
        ]);
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
        console.log("User logged in");
      },
      (error) => {
        return console.log(error);
      }
    );
  };

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
              //onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
              autoCapitalize="none"
              secureTextEntry={true}
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Sign In!</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleAnon}>
            <Text style={styles.forgotPwdButton}>Forgot Password?</Text>
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
