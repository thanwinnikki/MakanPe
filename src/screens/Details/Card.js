import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const Card = ({ itemData }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{itemData.dish}</Text>
      </View>
      <View style={styles.cardImgWrapper}>
        <Image
          source={itemData.image}
          resizeMode="cover"
          style={styles.cardImg}
        />
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: "row",
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 8,
    backgroundColor: "#F3F3F3",
  },
  cardImgWrapper: {
    flex: 2,
  },
  cardImg: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
    // borderBottomLeftRadius: 0,
    // borderTopLeftRadius: 0,
  },
  cardInfo: {
    flex: 3,
    padding: 10,
    borderColor: "#ccc",
    // borderWidth: 1,
    // borderRightWidth: 0,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  cardDetails: {
    fontSize: 12,
    color: "#444",
  },
});
