import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <View style={styles.homeButton}>
        <Text>Start Screen</Text>
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
      </View>
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
