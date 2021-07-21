import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import { data, makanLists } from "../../data/dummyData";
//import { MakanContext } from "./MakanContext/context";

export default function MakanListComponent() {
  const navigation = useNavigation();
  //const { listData, actions } = useContext(MakanContext);

  const makanCard = ({ item }) => {
    let cardImg = getObj(data, item.list[0].id).image;
    return (
      <TouchableOpacity
        style={{
          height: 135,
          width: 95,
          margin: 10,
          flexDirection: "column",
          elevation: 5,
          borderRadius: 8,
          backgroundColor: "#F3F3F3",
        }}
        onPress={() => navigation.navigate("MakanList", { itemData: item })}
      >
        <View style={{ flex: 3 }}>
          <Image
            source={cardImg}
            resizeMode="cover"
            style={{
              height: "100%",
              width: "100%",
              alignSelf: "center",
              borderRadius: 8,
            }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          <Text style={{ fontWeight: "bold", fontSize: 12 }}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const getObj = (list, id) => {
    const index = list.findIndex(function (obj, index) {
      return obj.id === id;
    });
    return list[index];
  };

  return (
    <View
      style={{
        //backgroundColor: "grey",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Saved MakanLists</Text>
      <FlatList
        data={makanLists}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ height: 20 }}
        renderItem={makanCard}
      />
    </View>
  );
}
