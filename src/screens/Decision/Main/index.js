import React, {useContext, useState, useEffect} from "react";
import { StyleSheet, View, Text, FlatList, Image, Animated, SafeAreaView } from "react-native";
import { styles } from './styles'
import { Context } from '../../../store/context'
import ChoiceList from "../ChoiceList/index";
import Footer from '../Footer/index'

const marginBottomItem = 20;
const paddingItem = 10;
const imgHeight = 100;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;

export default function Decision({navigation}) {


  return(
    <View style={styles.background}>
      <View style={styles.header}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
          MakanPe
        </Text>
      </View>
      <ChoiceList />
      <Footer nav={navigation} />      
    </View>
  )
}



