import React, { useState, useContext } from "react";
import { CommonActions } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera, faUser } from "@fortawesome/free-solid-svg-icons";
import * as Animatable from "react-native-animatable";

import * as db from "../../../api/database";
import * as Auth from "../../../api/auth";

export default function NewAccount({ navigation }) {
  const [data, setData] = useState({
    // local state
    fname: "",
    lname: "",
    isValidFname: true,
    isValidLname: true,
  });

  // update profile to database then navigate to home screen
  const handleProfile = () => {
    const email = Auth.getCurrentUserEmail();
    const userId = Auth.getCurrentUserId();
    if (data.isValidFname && data.isValidLname) {
      db.updateProfile(
        { userId, fname: data.fname, lname: data.lname, email },
        () =>
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
          return console.log(error);
        }
      );
    } else {
      Alert.alert("Invalid.", "Please enter your first and last name.", [
        { text: "ok" },
      ]);
    }
  };

  // validate first name
  const handleValidFname = (val) => {
    if (val.trim().length > 0) {
      setData({
        ...data,
        fname: val,
        isValidFname: true,
      });
    } else {
      setData({
        ...data,
        fname: val,
        isValidFname: false,
      });
    }
  };

  //validate last name
  const handleValidLname = (val) => {
    if (val.trim().length > 0) {
      setData({
        ...data,
        lname: val,
        isValidLname: true,
      });
    } else {
      setData({
        ...data,
        lname: val,
        isValidLname: false,
      });
    }
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={{ margin: 20 }}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => {}}>
              <View
                style={{
                  height: 200,
                  width: 200,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#F3F3F3",
                }}
              >
                <ImageBackground
                  source={require("../../assets/man.png")}
                  style={{ height: 200, width: 200 }}
                  imageStyle={{ borderRadius: 100 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCamera}
                      alignItems={"center"}
                      opacity={0.7}
                      color={"grey"}
                      size={30}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.action}>
            <FontAwesomeIcon
              icon={faUser}
              color={"grey"}
              marginRight={10}
              size={20}
            />
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              onChangeText={(val) => handleValidFname(val)}
              onEndEditing={(e) => handleValidFname(e.nativeEvent.text)}
              returnKeyType="next"
              autoCapitalize="words"
              style={styles.textInput}
            />
          </View>
          {data.isValidFname ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{ color: "red" }}>Field cannot be empty.</Text>
            </Animatable.View>
          )}

          <View style={styles.action}>
            <FontAwesomeIcon
              icon={faUser}
              color={"grey"}
              marginRight={10}
              size={20}
            />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#666666"
              onChangeText={(val) => handleValidLname(val)}
              onEndEditing={(e) => handleValidLname(e.nativeEvent.text)}
              autoCorrect={false}
              autoCapitalize="words"
              style={styles.textInput}
            />
          </View>
          {data.isValidLname ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{ color: "red" }}>Field cannot be empty.</Text>
            </Animatable.View>
          )}

          <TouchableOpacity style={styles.panelButton} onPress={handleProfile}>
            <Text style={styles.panelButtonTitle}>Let's Get Started!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#FF5858",
  },
  container: {
    backgroundColor: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF5858",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
});
