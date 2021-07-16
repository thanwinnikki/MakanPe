import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image,
  Alert,
} from "react-native";

import { CommonActions } from "@react-navigation/native";
import { AuthContext } from "../Login/context";
import * as db from "../../../api/database";
import * as Auth from "../../../api/auth";
import defaultImg from "../../assets/man.png";

export default function Profile({ navigation }) {
  const defaultImgUri = Image.resolveAssetSource(defaultImg).uri; //deafult profile image
  const [data, setData] = useState(null); // local state
  const [userId, setUserId] = useState(Auth.getCurrentUserId()); //userId from firebase
  const { signOut } = useContext(AuthContext); // user sign out method

  // retrieve profile from database, then set local state when component is mounted.
  useEffect(() => {
    return db.getUserProfile(userId, setData);
  }, []);

  // log out user and navigate to login screen
  const handleLogout = () => {
    signOut(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
      console.log("User logged out");
    }, console.error);
  };

  const handleEditScreen = () => {
    let isAnon = Auth.userIsAnonymous();
    if (isAnon) {
      Alert.alert("Guest Account", "Please log in to use this feature.");
    } else {
      navigation.navigate("EditProfile");
    }
  };

  return (
    <View style={styles.background}>
      <View
        style={{
          flexDirection: "row",
          height: 50,
          width: "100%",
          backgroundColor: "#FF5858",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingLeft: 15,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
          MakanPe
        </Text>
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            height: 125,
            width: "95%",
            borderRadius: 10,
            borderWidth: 1,
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Image
            style={styles.userImg}
            source={{ uri: data ? data.userImg : defaultImgUri }}
          />
          <View
            style={{
              justifyContent: "center",
              alignItems: "flex-start",
              marginLeft: 10,
            }}
          >
            <Text style={styles.username}>
              {data ? data.fname : "Guest"} {data ? data.lname : "User"}
            </Text>
            <View style={styles.userBtnWrapper}>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={handleEditScreen}
              >
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={handleLogout}>
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  userImg: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: "#F3F3F3",
    margin: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 200,
    marginBottom: 10,
    marginTop: 10,
  },
  userBtn: {
    borderColor: "#FF5858",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: "#FF5858",
  },
});
