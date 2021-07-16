import React, { useContext } from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import { styles } from "./styles";
import { Context } from "../../../store/context";

export default function Footer({ nav }) {
  const { state, actions } = useContext(Context);

  const resetChoices = () => {
    actions({
      type: "setState",

      payload: {
        ...state,
        list: [],
      },
    });
  };

  const resetAlert = () =>
    Alert.alert("Reset Choices?", "Press to Confirm", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Reset", onPress: () => resetChoices() },
    ]);

  if (state.list.length > 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => resetAlert()}
        >
          <Text style={styles.loginText}>Reset Choices</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chooseButton}
          onPress={() => console.log("Choose For Me!")}
        >
          <Text style={styles.loginText}>Choose For Me!</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.chooseButton}
          onPress={() => nav.navigate("Home")}
        >
          <Text style={styles.loginText}>Back to Home Page</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
