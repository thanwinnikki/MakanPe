import React, { useState, useContext, createRef } from "react";
import { CommonActions } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  Image,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera, faUser } from "@fortawesome/free-solid-svg-icons";
import * as Animatable from "react-native-animatable";

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import defaultImg from "../../assets/man.png";

import * as db from "../../../api/database";
import * as Auth from "../../../api/auth";

export default function NewAccount({ navigation }) {
  const bs = createRef(); //choose profile image bottom sheet ref
  const fall = new Animated.Value(1); //for bottom sheet
  const defaultImgUri = Image.resolveAssetSource(defaultImg).uri; //default profile image
  const [image, setImage] = useState(null); //profile image state
  const userId = Auth.getCurrentUserId();
  const [data, setData] = useState({
    // local state
    fname: "",
    lname: "",
    isValidFname: false,
    isValidLname: false,
  });

  // update profile to database then navigate to home screen
  const handleProfile = async () => {
    if (data.isValidFname && data.isValidLname) {
      let imgUrl = await uploadImg(image ? image : defaultImgUri);

      // if (imgUrl === null) {
      //   imgUrl = defaultImgUri;
      // }
      db.updateProfile(
        { userId, fname: data.fname, lname: data.lname, userImg: image },
        () =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: "Home",
                },
              ],
            })
          ),
        (error) => {
          return console.log(error);
        }
      );
    } else {
      Alert.alert("Invalid.", "Please enter your first and last name.", [
        { text: "ok" },
      ]);
    }
  };

  // Choose photo from library
  const selectImg = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return console.log("No library permission");
    }
    let imgResult = await ImagePicker.launchImageLibraryAsync({
      aspect: [1, 1],
      allowsEditing: true,
    });
    if (!imgResult.cancelled) {
      setImage(imgResult.uri);
      console.log("Image changed");
    }
  };

  // take photo with camera
  const takeImg = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return console.log("No camera permission");
    }
    let imgResult = await ImagePicker.launchCameraAsync({
      aspect: [1, 1],
      allowsEditing: true,
    });
    if (!imgResult.cancelled) {
      setImage(imgResult.uri);
      console.log("Image changed");
    }
  };

  //upload photo to firebase storage
  const uploadImg = async (uri) => {
    try {
      const uploadUrl = await db.uploadImageAsync(userId, uri);
      setImage(null);
      console.log("image uploaded");
      return uploadUrl;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takeImg}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={selectImg}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  // validate first name
  const handleValidFname = (val) => {
    if (val.trim().length > 0) {
      setData({
        ...data,
        fname: val,
        isValidFname: true,
      });
    } else {
      setData({
        ...data,
        fname: val,
        isValidFname: false,
      });
    }
  };

  //validate last name
  const handleValidLname = (val) => {
    if (val.trim().length > 0) {
      setData({
        ...data,
        lname: val,
        isValidLname: true,
      });
    } else {
      setData({
        ...data,
        lname: val,
        isValidLname: false,
      });
    }
  };

  return (
    <View style={styles.background}>
      <BottomSheet
        ref={bs}
        snapPoints={[500, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbacknode={fall}
        enabledGestureInteraction={true}
      />
      <View style={{ marginTop: 100, marginBottom: 50, alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => {
            bs.current.snapTo(0);
          }}
        >
          <View
            style={{
              height: 200,
              width: 200,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F3F3F3",
            }}
          >
            <ImageBackground
              source={{
                uri: image ? image : data ? data.userImg : defaultImgUri,
              }}
              style={{ height: 200, width: 200 }}
              imageStyle={{ borderRadius: 100 }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faCamera}
                  alignItems={"center"}
                  opacity={0.7}
                  color={"grey"}
                  size={30}
                />
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={{ margin: 20 }}>
          <View style={styles.action}>
            <FontAwesomeIcon
              icon={faUser}
              color={"grey"}
              marginRight={10}
              size={20}
            />
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              onChangeText={(val) => handleValidFname(val)}
              onEndEditing={(e) => handleValidFname(e.nativeEvent.text)}
              returnKeyType="next"
              autoCapitalize="words"
              style={styles.textInput}
            />
          </View>
          {data.isValidFname ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{ color: "red" }}>Field cannot be empty.</Text>
            </Animatable.View>
          )}

          <View style={styles.action}>
            <FontAwesomeIcon
              icon={faUser}
              color={"grey"}
              marginRight={10}
              size={20}
            />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#666666"
              onChangeText={(val) => handleValidLname(val)}
              onEndEditing={(e) => handleValidLname(e.nativeEvent.text)}
              autoCorrect={false}
              autoCapitalize="words"
              style={styles.textInput}
            />
          </View>
          {data.isValidLname ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={{ color: "red" }}>Field cannot be empty.</Text>
            </Animatable.View>
          )}

          <TouchableOpacity style={styles.panelButton} onPress={handleProfile}>
            <Text style={styles.panelButtonTitle}>Let's Get Started!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#FF5858",
  },
  container: {
    flex: 4,
    backgroundColor: "white",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF5858",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  header: {
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderColor: "#C4C4C4",
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#C4C4C4",
    height: "100%",
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
});
