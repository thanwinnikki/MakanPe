import React, { useEffect, useState, useContext, createRef } from "react";
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

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

import * as db from "../../../api/database";
import * as Auth from "../../../api/auth";

export default function EditProfile({ navigation }) {
  const bs = createRef(); //choose profile image bottom sheet ref
  const fall = new Animated.Value(1); //for bottom sheet

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
    db.updateProfile(
      {
        userId,
        fname: data.fname,
        lname: data.lname,
      },
      () => {
        Alert.alert("Name Updated", "Your name has been updated successfully!");
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
        return console.log(
          "email updated",
          "Your email has been updated successfully!"
        );
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
        Alert.alert(
          "Password changed!",
          "Your name has been updated successfully!"
        );
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

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={() => {}}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={() => {}}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );
  return (
    <View style={styles.background}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbacknode={fall}
        enabledGestureInteraction={true}
      />

      <Animated.View
        style={{
          marginLeft: 20,
          marginRight: 20,
          opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{ margin: 20 }}
            onPress={() => {
              bs.current.snapTo(0);
            }}
          >
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
        <View>
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
        <View>
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
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: "#C4C4C4",
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#C4C4C4",
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
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
