import React, {useContext} from "react";
import { StyleSheet, View, Text, Image, Animated, SafeAreaView, TouchableOpacity } from "react-native";
import { styles } from './styles'
import { Context } from '../../../store/context'

const marginBottomItem = 20;
const paddingItem = 10;
const imgHeight = 100;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;

export default function ChoiceList({nav}) {
    const {state, actions} = useContext(Context);
    const Yscroll = React.useRef(new Animated.Value(0)).current;

    const renderChoices = ({ item, index }) => {
        const scale = Yscroll.interpolate({
          inputRange: [
            -1, 0,
            sizeOfItem * index,
            sizeOfItem * (index + 2)
          ],
          outputRange: [1, 1, 1, 0]
        })
          return (
            <Animated.View style={
              [styles.item, {
                transform: [{scale}]
              }
              ]
            }>
              <Image 
                style={styles.image}
                source={item.image}
                resizeMode='cover'
                contentContainerStyle={{ padding: 20 }}
              />
              <View style={styles.wrapText}>
                <Text style={styles.fontSize}>{item.name}</Text>
                <Text style={styles.fontSize}> {'Rating: ' + item.rating + ' stars'} </Text>
              </View>
            </Animated.View>
    
          )
       }

       if (state.list.length > 0) {
       return (
        <SafeAreaView style={[styles.container, styles.imageBox]}>
              <Animated.FlatList
                data = {state.list}
                keyExtractor={item => item.name}
                renderItem ={renderChoices}
                contentContainerStyle={{
                  padding: 10
                }}
                onScroll={
                  Animated.event(
                    [{ nativeEvent: { contentOffset: { y: Yscroll } } }],
                    { useNativeDriver: true }
                  )}
              />             
        </SafeAreaView>
      ); 
    } else {
      return (
      <SafeAreaView style={[styles.container, styles.imageBox]}>
        <Text style={styles.text}>Let's go make some choices first! </Text>
        <View style={{ paddingLeft: 55, paddingTop: 100}}> 
        <TouchableOpacity
                style={styles.chooseButton}
                onPress={() => nav.navigate("Home")}
            >
            <Text style={styles.buttonText}>Back to Home Page</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
      )
    }

}