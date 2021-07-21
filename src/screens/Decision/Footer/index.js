import React, { useContext, useState, useEffect } from "react";
import { TouchableOpacity, View, Text, Alert } from "react-native";
import { styles } from "./styles";
import { Context } from "../../../store/context";
import Popup from "../Popup";

export default function Footer({ nav }) {
  const { state, actions } = useContext(Context);
  const [choice, setChoice] = useState(null);

  async function chooseMe() {
    const index = Math.floor(Math.random() * state.list.length);
    const chosen = state.list[index].name
    console.log(choice)
    setChoice(chosen)
    
 }

  const resetChoices = () => {
    actions({
      type: "setState",

      payload: {
        ...state,
        list: [],
      },
    });
  };

  const resetAlert = () => {
    Alert.alert("Reset Choices?", "Press to Confirm", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Reset", onPress: () => resetChoices() },
    ]);
  }
  

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
          onPress={() => chooseMe() }
        >
          <Text style={styles.loginText}>Choose For Me!</Text>
        </TouchableOpacity>
        <Popup />
      </View>
    );
  } else {
    return null;
  }
}
