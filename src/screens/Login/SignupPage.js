import React, { useState, useRef, useContext } from "react";
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

import { AuthContext } from "./context";

import * as Animatable from "react-native-animatable";
import MakanpeIcon from "../../assets/makanpe-icon";

const SignupPage = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    isValidUser: true,
    isValidPassword: true,
  });
  const passwordTextInput = useRef();
  const { signUp } = useContext(AuthContext);

  const handleRegister = () => {
    signUp(
      { email: data.email, password: data.password },
      (user) =>
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: "NewAcc",
              },
            ],
          })
        ),

      (error) => {
        switch (error.code) {
          case "auth/invalid-email":
            Alert.alert(
              "Invalid Email!",
              "Your email address is badly formatted.",
              [{ text: "ok" }]
            );
            return console.log(error.code);
          case "auth/email-already-exists":
            Alert.alert("Invalid Email!", "The email is already in use.", [
              { text: "ok" },
            ]);
            return console.log(error.code);
          case "auth/weak-password":
            Alert.alert(
              "Bad Password!",
              "Your password must be at least 6 characters.",
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
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingTop: 100,
          paddingBottom: 50,
        }}
      >
        <Text style={styles.logo}>Makan</Text>
        <MakanpeIcon color={"white"} size={90} />
      </View>
      <View style={styles.subcontainer}>
        <View style={styles.details}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              keyboardType="email-address"
              placeholder="Enter Email Here"
              placeholderTextColor="#958686"
              onChangeText={(val) => handleValidUser(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
              returnKeyType="next"
              onSubmitEditing={() => passwordTextInput.current.focus()}
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
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{ color: "red" }}>
                Password must be at least 6 characters.
              </Text>
            </Animatable.View>
          )}

          <TouchableOpacity style={styles.createAcc}>
            <Text style={styles.createAccText} onPress={handleRegister}>
              Create Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text
              style={styles.goBackButton}
              onPress={() => navigation.goBack()}
            >
              Already have an account? Sign In!
            </Text>
          </TouchableOpacity>
        </View>
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
    flex: 4,
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  details: {
    paddingTop: 20,
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

  createAccText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },

  createAcc: {
    width: "70%",
    borderRadius: 30,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 20,
    backgroundColor: "#FF5858",
  },
  goBackButton: {
    height: 30,
    color: "grey",
    fontSize: 15,
  },
});

export default SignupPage;
