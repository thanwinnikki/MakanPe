import * as React from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";

export default function Maps({ route, navigation }) {
  const { itemData } = route.params;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: itemData.location.latitude,
          longitude: itemData.location.longtitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{
            latitude: itemData.location.latitude,
            longitude: itemData.location.longtitude,
          }}
          title={itemData.name}
        >
          <Image
            source={require("../assets/map-marker.png")}
            style={{ width: 26, height: 28 }}
            resizeMode="contain"
          />
        </Marker>
      </MapView>
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
