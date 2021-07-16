import React, { useEffect, useState, useContext, createRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCamera,
  faUser,
  faEnvelope,
  faKey,
} from "@fortawesome/free-solid-svg-icons";

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

import * as ImagePicker from "expo-image-picker";
import defaultImg from "../../assets/man.png";

import * as db from "../../../api/database";
import * as Auth from "../../../api/auth";

export default function EditProfile({ navigation }) {
  const bs = createRef(); //choose profile image bottom sheet ref
  const fall = new Animated.Value(1); //for bottom sheet
  const defaultImgUri = Image.resolveAssetSource(defaultImg).uri; //deafult profile image
  const [image, setImage] = useState(null); //profile image state
  const [data, setData] = useState(null); //profile local state
  const userId = Auth.getCurrentUserId(); //userId from database

  // update profile in database with local state
  const handleUpdateProfile = async () => {
    let imgUrl = await uploadImg(image);

    if (imgUrl === null && data.userImg) {
      imgUrl = data.userImg;
    }
    db.updateProfile(
      {
        userId,
        fname: data.fname,
        lname: data.lname,
        userImg: imgUrl,
      },
      () => {
        Alert.alert(
          "Profile Updated",
          "Your profile has been updated successfully!"
        );
      },
      (error) => {
        Alert.alert(error.message);
        return console.log(error);
      }
    );
  };

  // retrieve profile from database, then set local state when component is mounted.
  useEffect(() => {
    return db.getUserProfile(userId, setData);
  }, []);

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
      alert("Image upload failed, sorry :(");
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

      <Animated.View
        style={{
          marginLeft: 20,
          marginRight: 20,
          opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{ margin: 20 }}
            onPress={() => {
              bs.current.snapTo(0);
            }}
          >
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#F3F3F3",
              }}
            >
              <ImageBackground
                source={{
                  uri: image ? image : data ? data.userImg : defaultImgUri,
                }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 50 }}
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
        <View>
          <View style={styles.action}>
            <FontAwesomeIcon
              icon={faUser}
              color={"grey"}
              marginRight={10}
              size={20}
            />
            <Text style={{ fontWeight: "bold" }}>First Name:</Text>
            <TextInput
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={data ? data.fname : ""}
              onChangeText={(txt) => setData({ ...data, fname: txt })}
              returnKeyType="next"
              autoCapitalize="words"
              clearTextOnFocus={true}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <FontAwesomeIcon
              icon={faUser}
              color={"grey"}
              marginRight={10}
              size={20}
            />
            <Text style={{ fontWeight: "bold" }}>Last Name:</Text>
            <TextInput
              placeholderTextColor="#666666"
              onChangeText={(txt) => setData({ ...data, lname: txt })}
              autoCorrect={false}
              value={data ? data.lname : ""}
              returnKeyType="next"
              autoCapitalize="words"
              clearTextOnFocus={true}
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={handleUpdateProfile}
          >
            <Text style={styles.panelButtonTitle}>Update profile</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={styles.panelButtonv2}
            onPress={() => navigation.navigate("ChangeUserEmail")}
          >
            <Text style={styles.panelButtonTitlev2}>Change Email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButtonv2}
            onPress={() => navigation.navigate("ChangeUserPassword")}
          >
            <Text style={styles.panelButtonTitlev2}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flex: 1,
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
    marginTop: -5,
    paddingLeft: 20,
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
  panelButtonv2: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "#FF5858",
    alignItems: "center",
    margin: 7,
  },
  panelButtonTitlev2: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#FF5858",
  },
});
