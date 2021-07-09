import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCamera,
  faUser,
  faEnvelope,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

import * as db from "../../../api/database";
import * as Auth from "../../../api/auth";

export default function EditProfile({ navigation }) {
  const [data, setData] = useState(null); //profile local state
  const [changeEmail, setChangeEmail] = useState({
    // update email local state
    email: "",
    curPwd: "",
  });
  const [changePwd, setChangePwd] = useState({
    // update password local state
    newPwd: "",
    curPwd: "",
  });
  const userId = Auth.getCurrentUserId(); //userId from database

  // update profile in database with local state
  const handleUpdateName = () => {
    console.log(data);
    db.updateProfile(
      {
        userId,
        fname: data.fname,
        lname: data.lname,
      },
      () => {
        Alert.alert(
          "Profile Updated",
          "Your profile has been updated successfully!",
          [{ text: "ok" }]
        );
      },
      (error) => {
        Alert.alert(error.message);
        return console.log(error);
      }
    );
  };

  const handleUpdateEmail = () => {
    Auth.updateUserEmail(
      changeEmail.email,
      changeEmail.curPwd,
      () => {
        Alert.alert("Email updated!");
        return console.log("email updated");
      },
      (error) => {
        Alert.alert(error.message);
        return console.log(error);
      }
    );
  };

  const handleUpdatePassword = () => {
    Auth.updateUserPassword(
      changePwd.newPwd,
      changePwd.curPwd,
      () => {
        Alert.alert("Password changed!");
        return console.log("Password changed");
      },
      (error) => {
        Alert.alert(error.message);
        return console.log(error);
      }
    );
  };

  // retrieve profile from database, then set local state when component is mounted.
  useEffect(() => {
    //console.log(data);
    return db.getUserProfile(userId, setData);
  }, []);

  return (
    <ScrollView style={styles.background}>
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
        <View>
          <View style={styles.action}>
            <FontAwesomeIcon
              icon={faUser}
              color={"grey"}
              marginRight={10}
              size={20}
            />
            <Text style={{ fontWeight: "bold" }}>First Name:</Text>
            <TextInput
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={data ? data.fname : ""}
              onChangeText={(txt) => setData({ ...data, fname: txt })}
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
              placeholderTextColor="#666666"
              onChangeText={(txt) => setData({ ...data, lname: txt })}
              autoCorrect={false}
              value={data ? data.lname : ""}
              returnKeyType="next"
              autoCapitalize="words"
              clearTextOnFocus={true}
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={handleUpdateName}
          >
            <Text style={styles.panelButtonTitle}>Update name</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "yellow" }}>
          <View style={styles.action}>
            <FontAwesomeIcon
              icon={faEnvelope}
              color={"grey"}
              marginRight={10}
              size={20}
            />
            <Text style={{ fontWeight: "bold" }}>New Email:</Text>
            <TextInput
              placeholderTextColor="#666666"
              onChangeText={(txt) =>
                setChangeEmail({ ...changeEmail, email: txt })
              }
              autoCorrect={false}
              autoCapitalize="none"
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <FontAwesomeIcon
              icon={faKey}
              color={"grey"}
              marginRight={10}
              size={20}
            />
            <Text style={{ fontWeight: "bold" }}>Current Password:</Text>
            <TextInput
              placeholderTextColor="#666666"
              onChangeText={(txt) =>
                setChangeEmail({ ...changeEmail, curPwd: txt })
              }
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={handleUpdateEmail}
          >
            <Text style={styles.panelButtonTitle}>Update email</Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "yellow" }}>
          <View style={styles.action}>
            <FontAwesomeIcon
              icon={faEnvelope}
              color={"grey"}
              marginRight={10}
              size={20}
            />
            <Text style={{ fontWeight: "bold" }}>New Password:</Text>
            <TextInput
              placeholderTextColor="#666666"
              onChangeText={(txt) =>
                setChangePwd({ ...changePwd, newPwd: txt })
              }
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <FontAwesomeIcon
              icon={faKey}
              color={"grey"}
              marginRight={10}
              size={20}
            />
            <Text style={{ fontWeight: "bold" }}>Current Password:</Text>
            <TextInput
              placeholderTextColor="#666666"
              onChangeText={(txt) =>
                setChangePwd({ ...changePwd, curPwd: txt })
              }
              autoCorrect={false}
              autoCapitalize="none"
              secureTextEntry={true}
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={handleUpdatePassword}
          >
            <Text style={styles.panelButtonTitle}>Update password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
