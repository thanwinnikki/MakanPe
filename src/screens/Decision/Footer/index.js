import React, { useContext, useState, useEffect } from "react";
import { TouchableOpacity, View, Text, Alert, Modal } from "react-native";
import { styles } from "./styles";
import { Context } from "../../../store/context";
import Popup from "../Popup";

export default function Footer({ nav }) {
  const { state, actions } = useContext(Context);


 const showPlease = () => {
  const index = Math.floor(Math.random() * state.list.length);
  const chosenObject = state.list[index]

  actions({
    type: 'setState',

    payload: {
      ...state,
      value: true,
      choice: chosenObject
    }
  })
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
          <Text style={styles.buttonText}>Reset Choices</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chooseButton}
          onPress={() => showPlease() }
        >
          <Text style={styles.buttonText}>Choose For Me!</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return null;
  }
}
