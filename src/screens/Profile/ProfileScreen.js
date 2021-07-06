import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  Image,
} from "react-native";

import { CommonActions } from "@react-navigation/native";
import { AuthContext } from "../Login/context";
import * as db from "../../../api/database";
import * as Auth from "../../../api/auth";

export default function Profile({ navigation, routes }) {
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
  });
  const { signOut } = useContext(AuthContext);
  const userId = Auth.getCurrentUserId();

  const getProfile = () => {
    db.getUserProfile(userId, setUserData);
  };

  useEffect(() => {
    getProfile();
  }, []);

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
            source={require("../../assets/man.png")}
          />
          <View
            style={{
              //backgroundColor: "grey",
              justifyContent: "center",
              alignItems: "flex-start",
              marginLeft: 10,
            }}
          >
            <Text style={styles.username}>
              {userData.fname + " " + userData.lname}
            </Text>
            <View style={styles.userBtnWrapper}>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate("EditProfile");
                }}
              >
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={handleLogout}>
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={navigation.navigate("NewAcc")}
          >
            <Text style={styles.userBtnTxt}>New acc</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "white",
    //paddingTop: Platform.OS === "android" ? 25 : 0,
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
