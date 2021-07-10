import React, { useState, useContext } from "react";
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
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

import * as Auth from "../../../api/auth";

export default function ChangePassword({ navigation }) {
  const [changePwd, setChangePwd] = useState({
    email: "",
    newPwd: "",
    curPwd: "",
  });

  const handleChangePassword = () => {
    Auth.changeUserPassword(
      changePwd.email,
      changePwd.newPwd,
      changePwd.curPwd,
      () => {
        navigation.goBack();
        Alert.alert(
          "Password changed!",
          "Please log in to your account to continue."
        );
        return console.log("Password changed");
      },
      (error) => {
        Alert.alert(error.message);
        return console.log(error);
      }
    );
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={{ backgroundColor: "white", margin: 20 }}>
          <View style={styles.action}>
            <FontAwesomeIcon
              icon={faEnvelope}
              color={"grey"}
              marginRight={10}
              size={20}
            />
            <Text style={{ fontWeight: "bold" }}>Email:</Text>
            <TextInput
              placeholderTextColor="#666666"
              onChangeText={(txt) => setChangePwd({ ...changePwd, email: txt })}
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
                setChangePwd({ ...changePwd, curPwd: txt })
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

          <TouchableOpacity
            style={styles.panelButton}
            onPress={handleChangePassword}
          >
            <Text style={styles.panelButtonTitle}>Change password</Text>
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
    flex: 0.5,
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
