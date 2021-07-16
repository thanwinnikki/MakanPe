import React, { useEffect, useState, useContext, createRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

import * as Auth from "../../../api/auth";

export default function ChangeUserEmail({ navigation }) {
  const [changeEmail, setChangeEmail] = useState({
    // update email local state
    email: "",
    curPwd: "",
  });

  const handleUpdateEmail = () => {
    Auth.updateUserEmail(
      changeEmail.email,
      changeEmail.curPwd,
      () => {
        Alert.alert(
          "Email updated!",
          "Your email has been updated successfully!"
        );
        return console.log("Email Updated");
      },
      (error) => {
        Alert.alert(error.message);
        return console.log(error);
      }
    );
  };

  return (
    <View style={{ flex: 0.5, backgroundColor: "white" }}>
      <View
        style={{
          alignItems: "center",
          marginTop: 30,
          marginLeft: 20,
          marginRight: 20,
        }}
      >
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
    </View>
  );
}

const styles = StyleSheet.create({
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
