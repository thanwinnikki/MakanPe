import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  Platform,
  Animated,
  ScrollView,
} from "react-native";

import { BlurView } from "@react-native-community/blur";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { data } from "../data/dummyData";
import Card from "../components/Card";

const HEADER_HEIGHT = 350;

export default function RestaurantDetails({ route, navigation }) {
  const offset = useRef(new Animated.Value(0)).current;
  const itemData = route.params.itemData;

  function renderMenu({ item }) {
    return (
      <View style={styles.menu}>
        <Card key={item.id} itemData={item} />
      </View>
    );
  }

  function renderHeaderImg() {
    return (
      <View style={styles.headerImg}>
        <Animated.Image
          source={itemData.image}
          resizeMode="cover"
          style={{
            height: HEADER_HEIGHT,
            width: "200%",
            transform: [
              {
                translateY: offset.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                }),
              },
              {
                scale: offset.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [2, 1, 0.75],
                }),
              },
            ],
          }}
        />
      </View>
    );
  }

  function renderInfo() {
    return (
      <View
        style={{
          padding: 20,
          backgroundColor: "white",
        }}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{itemData.name}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <FontAwesomeIcon color="#FF5858" icon={faStar} />
          <Text style={{ marginHorizontal: 2 }}>{itemData.rating}</Text>
        </View>
        <View>
          <Text
            style={{
              padding: 10,
              backgroundColor: "white",
            }}
          >
            {itemData.description}
          </Text>
        </View>
      </View>
    );
  }

  function renderMap() {
    return (
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => {
            navigation.navigate("Maps", {
              itemData: itemData,
            });
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Show on map
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.FlatList
        data={itemData.menu}
        ListHeaderComponent={
          <View>
            {renderHeaderImg()}
            {renderInfo()}
            {renderMap()}
          </View>
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: offset } } }],
          { useNativeDriver: true }
        )}
        renderItem={renderMenu}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  menu: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  headerImg: {
    alignItems: "center",
    overflow: "hidden",
    marginTop: -1000,
    paddingTop: 1000,
  },
  headerInfo: {
    height: 130,
    paddingHorizontal: 30,
    paddingVertical: 20,
    overflow: "scroll",
  },
  titleContainer: {
    justifyContent: "flex-start",
    flex: 1.5,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    textAlign: "justify",
  },
  mapButton: {
    backgroundColor: "#FF5858",
    height: 35,
    width: "75%",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
