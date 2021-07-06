import React, { useEffect, useState } from "react";
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
import {
  faCamera,
  faUser,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

import * as db from "../../../api/database";
import * as Auth from "../../../api/auth";

export default function EditProfile({ navigation }) {
  const [userData, setUserData] = useState("");
  const userId = Auth.getCurrentUserId();

  const handleUpdate = () => {
    db.updateProfile(
      {
        userId,
        fname: userData.fname,
        lname: userData.lname,
        email: userData.email,
      },
      () => {
        Alert.alert(
          "Profile Updated",
          "Your profile has been updated successfully!",
          [{ text: "ok" }]
        );
        navigation.goBack();
      },
      (error) => {
        return console.log(error);
      }
    );
  };

  const getProfile = () => {
    db.getUserProfile(userId, setUserData);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <View style={styles.background}>
      <View style={{ margin: 20 }}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={{ margin: 20 }} onPress={() => {}}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F3F3F3",
              }}
            >
              <ImageBackground
                source={require("../../assets/man.png")}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 50 }}
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
          <Text style={{ fontWeight: "bold" }}>First Name:</Text>
          <TextInput
            placeholder={userData.fname}
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.fname : ""}
            onChangeText={(txt) => setUserData({ ...userData, fname: txt })}
            returnKeyType="next"
            autoCapitalize="words"
            clearTextOnFocus={true}
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
          <Text style={{ fontWeight: "bold" }}>Last Name:</Text>
          <TextInput
            placeholder={userData.lname}
            placeholderTextColor="#666666"
            value={userData ? userData.lname : ""}
            onChangeText={(txt) => setUserData({ ...userData, lname: txt })}
            autoCorrect={false}
            returnKeyType="next"
            autoCapitalize="words"
            clearTextOnFocus={true}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesomeIcon
            icon={faEnvelope}
            color={"grey"}
            marginRight={10}
            size={20}
          />
          <Text style={{ fontWeight: "bold" }}>Email:</Text>
          <TextInput
            placeholder={userData.email}
            placeholderTextColor="#666666"
            value={setUserData ? userData.email : ""}
            onChangeText={(txt) => setUserData({ ...userData, email: txt })}
            autoCorrect={false}
            autoCapitalize="words"
            clearTextOnFocus={true}
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity style={styles.panelButton} onPress={handleUpdate}>
          <Text style={styles.panelButtonTitle}>Update</Text>
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
    marginTop: -5,
    paddingLeft: 20,
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
