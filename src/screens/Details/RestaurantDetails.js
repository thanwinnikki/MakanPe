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

import Card from "./Card";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const HEADER_HEIGHT = 350;

export default function RestaurantDetails({ route, navigation }) {
  const offset = useRef(new Animated.Value(0)).current; // animation value
  const itemData = route.params.itemData; // restaurant data

  // restaurant menu
  function renderMenu({ item }) {
    return (
      <View style={styles.menu}>
        <Card key={item.id} itemData={item} />
      </View>
    );
  }

  // custom back button
  function renderHeaderBar() {
    return (
      <Animated.View
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          height: 90,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          paddingBottom: 20,
          //backgroundColor: "white",
          opacity: offset.interpolate({
            inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 70],
            outputRange: [1, 0],
          }),
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 45,
            width: 45,
            borderRadius: 25,
            borderWidth: 3,
            borderColor: "#FF5858",
            backgroundColor: "white",
          }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesomeIcon color="#FF5858" icon={faArrowLeft} size={30} />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // restaurant image
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

  // restaurant info
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

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text
              style={{ marginHorizontal: 2, fontSize: 20, color: "#FF5858" }}
            >
              {itemData.rating}
            </Text>
            <FontAwesomeIcon color="#FF5858" icon={faStar} size={24} />
          </View>
        </View>

        <View>
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "#FF5858" }}>
            {itemData.cost}
          </Text>
          <Text>Address: {itemData.address}</Text>
          <Text style={{ paddingTop: 10 }}>{itemData.description}</Text>
        </View>
      </View>
    );
  }

  // show on map button
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
      <View
        style={{
          flexDirection: "row",
          height: 50,
          width: "100%",
          backgroundColor: "#FF5858",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingLeft: 15,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
          MakanPe
        </Text>
      </View>
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
      {renderHeaderBar()}
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
    //justifyContent: "flex-start",
    alignItems: "center",
    flex: 1.5,
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
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
