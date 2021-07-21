import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faPlusCircle,
  faPlus,
  faStar,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { data } from "../../data/dummyData";

function addRestaurantScreen({ route, navigation }) {
  const { itemData } = route.params;
  const [newItemData, setNewItemData] = useState(itemData);

  const addRestaurant = (restaurant) => {
    let existInPrev = itemData.list.find((item) => {
      return item.id === restaurant.id;
    });
    let existInNew = newItemData.list.find((item) => {
      return item.id === restaurant.id;
    });
    if (existInPrev || existInNew) {
      Alert.alert(
        "Restaurant already added!",
        "Please choose another restaurant."
      );
      return;
    }
    setNewItemData({
      ...newItemData,
      list: [...newItemData.list, { id: restaurant.id }],
    });
    Alert.alert("Restaurant added!", "Restaurant succesfully added to list.");
    console.log(newItemData);
  };

  const renderTopHeader = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#FF5858",
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: "center", paddingLeft: 16 }}
          onPress={() =>
            navigation.navigate({
              name: "MakanList",
              params: { itemData: newItemData },
              merge: true,
            })
          }
        >
          {/* <FontAwesomeIcon icon={faSave} color="white" size={24} /> */}
          <Text style={{ color: "white", fontSize: 18 }}>Save</Text>
        </TouchableOpacity>
        <View style={{ justifyContent: "center", paddingLeft: 30 }}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Add Restaurant
          </Text>
        </View>
      </View>
    );
  };

  const renderList = ({ item }) => {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          margin: 10,
          flexDirection: "row",
          elevation: 5,
          borderRadius: 8,
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
          backgroundColor: "#F3F3F3",
        }}
        onPress={() => navigation.navigate("Restaurant", { itemData: item })}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ width: 100, height: 100 }}>
            <Image
              source={item.image}
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
              {item.name}
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
                {item.rating}
              </Text>
              <FontAwesomeIcon color="#FF5858" icon={faStar} size={20} />
              <Text style={{ marginLeft: 10, fontSize: 18, color: "#FF5858" }}>
                {item.cost}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ justifyContent: "center", alignContent: "center" }}
            onPress={() => {
              addRestaurant(item);
              //console.log(itemData);
            }}
          >
            <FontAwesomeIcon
              icon={faPlus}
              marginRight={15}
              size={40}
              color="grey"
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {renderTopHeader()}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        style={{ width: "100%" }}
        renderItem={renderList}
      />
    </View>
  );
}

export default addRestaurantScreen;
