import React, { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import * as Location from "expo-location";
import * as Permission from "expo-permissions";

export default function Maps({ route, navigation }) {
  const { itemData } = route.params;
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longtitude: null,
  });
  const [locationPerm, setLocationPerm] = useState(false);
  const [mapRegion, setMapRegion] = useState(null);

  const getLocation = async () => {
    // let { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== "granted") {
    //   setLocationPerm(false);
    //   return;
    // }
    // setLocationPerm(true);

    // let location = await Location.getCurrentPositionAsync({});
    // setUserLocation({
    //   latitude: location.coords.latitude,
    //   longtitude: location.coords.longitude,
    // });
    // console.log(userLocation);

    setMapRegion({
      latitude: itemData.location.latitude,
      longitude: itemData.location.longtitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.0121,
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  // custom go back button
  function renderHeaderBar() {
    return (
      <View
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
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          height: 100,
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
      {/* {userLocation === null ? (
        <Text>Loading Location...</Text>
      ) : locationPerm === false ? (
        <Text>Location permissions not granted.</Text>
      ) : ( */}
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} region={mapRegion}>
        <Marker
          coordinate={{
            latitude: itemData.location.latitude,
            longitude: itemData.location.longtitude,
          }}
          title={itemData.name}
        >
          <Image
            source={require("../../assets/map-marker.png")}
            style={{ width: 26, height: 28 }}
            resizeMode="contain"
          />
        </Marker>
        {/* <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longtitude: userLocation.longitude,
            }}
            //title="You are here!"
          >
            <Image
              source={require("../../assets/man.png")}
              style={{ width: 26, height: 28 }}
              resizeMode="contain"
            />
          </Marker> */}
      </MapView>

      {renderHeaderBar()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
});
