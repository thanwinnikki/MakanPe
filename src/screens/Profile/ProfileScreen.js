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

export default function Profile({ navigation, routes }) {
  const [username, setUsername] = useState("");
  const { signOut, getUsername } = useContext(AuthContext);

  useEffect(() => {
    setUsername(getUsername());
  });

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
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        <Image
          style={styles.userImg}
          source={require("../../assets/man.png")}
        />
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.aboutUser}>
          I love steak. Bring me to steak house pls.
        </Text>
        <View style={styles.userBtnWrapper}>
          <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
            <Text style={styles.userBtnTxt}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={handleLogout}>
            <Text style={styles.userBtnTxt}>Logout</Text>
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
    paddingTop: Platform.OS === "android" ? 25 : 0,
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
    height: 150,
    width: 150,
    borderRadius: 75,
    backgroundColor: "#F3F3F3",
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
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  userBtn: {
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: "#2e64e5",
  },
});
