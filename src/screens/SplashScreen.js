import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import MakanpeIcon from "../assets/makanpe-icon";
import * as Animatable from "react-native-animatable";

export default function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FF5858",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={{ flex: 1, flexDirection: "row", paddingTop: 300 }}>
        <Animatable.Text
          style={{ fontSize: 60, color: "white", fontWeight: "bold" }}
          animation="slideInLeft"
        >
          Makan
        </Animatable.Text>
        <Animatable.View animation="bounceIn" delay={1000}>
          <MakanpeIcon color={"white"} size={90} />
        </Animatable.View>
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
});
