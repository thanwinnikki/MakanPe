import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";
import { data } from "../data/dummyData";

import { AuthContext } from "../components/context";
import { CommonActions } from "@react-navigation/native";

export default function HomeScreen({ navigation, route }) {
  const { signOut } = useContext(AuthContext);

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
      <View>
        <Button title="Sign out" onPress={handleLogout} />
      </View>
      <Button
        title={data[0].name}
        onPress={() =>
          navigation.navigate("Restaurant", {
            itemData: data[0],
          })
        }
      />
      <Button
        title={data[1].name}
        onPress={() =>
          navigation.navigate("Restaurant", {
            itemData: data[1],
          })
        }
      />
      <Button
        title={data[2].name}
        onPress={() =>
          navigation.navigate("Restaurant", {
            itemData: data[2],
          })
        }
      />
      <Button
        title={data[3].name}
        onPress={() =>
          navigation.navigate("Restaurant", {
            itemData: data[3],
          })
        }
      />
      <Button
        title={data[4].name}
        onPress={() =>
          navigation.navigate("Restaurant", {
            itemData: data[4],
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FF5858",
  },
  homeButton: {
    backgroundColor: "white",
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
