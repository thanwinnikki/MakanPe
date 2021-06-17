import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";

export default function Decision() {
  return (
    <View style={styles.background}>
      <Text>This is the decision screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FF5858",
  },
});
