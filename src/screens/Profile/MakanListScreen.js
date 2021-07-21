import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPlusCircle,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { data } from "../../data/dummyData";

export default function MakanList({ route, navigation }) {
  const { itemData } = route.params;

  const getObj = (list, id) => {
    const index = list.findIndex(function (obj, index) {
      return obj.id === id;
    });
    return list[index];
  };

  // const removeRestaurant = (id) => {
  //   const index = listData.findIndex(function (obj, index) {
  //     return obj.id === id;
  //   });
  //   let newList = listData;
  //   newList.splice(index, 1);
  //   setListData(newList);
  // };

  const renderHeader = () => {
    let headerImg = getObj(data, itemData.list[0].id).image;
    return (
      <View
        style={{
          height: 300,
          width: "100%",
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginTop: 25,
            borderRadius: 8,
            height: 170,
            width: 170,
            borderRadius: 10,
          }}
        >
          <Image
            source={headerImg}
            resizeMode="cover"
            style={{ height: "100%", width: "100%", borderRadius: 10 }}
          />
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 24, margin: 5 }}>
          {itemData.name}
        </Text>

        {/* <TouchableOpacity
          style={{
            flexDirection: "row",
            padding: 13,
            borderRadius: 20,
            width: 120,
            backgroundColor: "#FF5858",
            justifyContent: "center",
            marginVertical: 7,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
            Share
          </Text>
          <FontAwesomeIcon
            icon={faShare}
            color={"white"}
            marginLeft={10}
            size={20}
          />
        </TouchableOpacity> */}

        <TouchableOpacity
          style={{
            flexDirection: "row",
            padding: 5,
            borderRadius: 20,
            width: 130,
            backgroundColor: "#F3F3F3",
            justifyContent: "center",
            marginTop: 10,
          }}
          onPress={() =>
            navigation.navigate("AddRestaurant", { itemData: itemData })
          }
        >
          <Text style={{ fontSize: 12 }}>Add Restaurant</Text>
          <FontAwesomeIcon icon={faPlusCircle} marginLeft={5} size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderList = ({ item }) => {
    let restaurant = getObj(data, item.id);

    return (
      <TouchableOpacity
        style={{
          height: 100,
          width: "80%",
          margin: 10,
          flexDirection: "row",
          elevation: 5,
          borderRadius: 8,
          backgroundColor: "#F3F3F3",
        }}
        onPress={() =>
          navigation.navigate("Restaurant", { itemData: restaurant })
        }
      >
        <View style={{ width: 100, height: 100 }}>
          <Image
            source={restaurant.image}
            resizeMode="cover"
            style={{
              height: "100%",
              width: "100%",
              alignSelf: "center",
              borderRadius: 8,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            marginLeft: 10,
            marginTop: 10,
            //backgroundColor: "grey",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {restaurant.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{ marginHorizontal: 2, fontSize: 16, color: "#FF5858" }}
            >
              {restaurant.rating}
            </Text>
            <FontAwesomeIcon color="#FF5858" icon={faStar} size={20} />
            <Text style={{ marginLeft: 10, fontSize: 18, color: "#FF5858" }}>
              {restaurant.cost}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <FontAwesomeIcon
            icon={faTrash}
            color="#FF5858"
            size={20}
            margin={5}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          position: "absolute",
        }}
      >
        <Image
          source={require("../../assets/Background.png")}
          resizeMode="cover"
          style={{ width: "100%" }}
        />
      </View>
      <FlatList
        data={itemData.list}
        keyExtractor={(item) => item.id}
        horizontal={false}
        style={{
          width: "100%",
        }}
        contentContainerStyle={{ alignItems: "center" }}
        ListHeaderComponent={<View>{renderHeader()}</View>}
        renderItem={renderList}
      />
    </View>
  );
}
