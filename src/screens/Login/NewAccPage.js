import React, { useState } from "react";
import { CommonActions } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCamera,
  faUser,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import * as db from "../../../api/database";
import * as Auth from "../../../api/auth";

export default function NewAccount({ navigation, route }) {
  const [userData, setUserData] = useState(null);
  const { email } = route.params;
  const userId = Auth.getCurrentUserId();

  const handleProfile = () => {
    db.updateProfile(
      { userId, fname: userData.fname, lname: userData.lname, email },
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
  };

  return (
    <View style={styles.background}>
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
            value={userData ? userData.fname : ""}
            onChangeText={(txt) => setUserData({ ...userData, fname: txt })}
            style={styles.textInput}
          />
        </View>
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
            value={userData ? userData.lname : ""}
            onChangeText={(txt) => setUserData({ ...userData, lname: txt })}
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity style={styles.panelButton} onPress={handleProfile}>
          <Text style={styles.panelButtonTitle}>Let's Get Started!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
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
