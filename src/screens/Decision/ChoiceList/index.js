import React, {useContext} from "react";
import { StyleSheet, View, Text, Image, Animated, SafeAreaView } from "react-native";
import { styles } from './styles'
import { Context } from '../../../store/context'

const marginBottomItem = 20;
const paddingItem = 10;
const imgHeight = 100;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;

export default function ChoiceList() {
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
                resizeMode='contain'
                contentContainerStyle={{ padding: 20 }}
              />
              <View style={styles.wrapText}>
                <Text style={styles.fontSize}>{item.name}</Text>
                <Text style={styles.fontSize}> {item.rating + ' stars'} </Text>
              </View>
            </Animated.View>
    
          )
       }

       return (
        <SafeAreaView style={[styles.container, styles.imageBox]}>
          {
            state.list.length > 0 ? (
              <Animated.FlatList
                data = {state.list}
                keyExtractor={item => item.name}
                renderItem ={renderChoices}
                contentContainerStyle={{
                  padding: 20
                }}
                onScroll={
                  Animated.event(
                    [{ nativeEvent: { contentOffset: { y: Yscroll } } }],
                    { useNativeDriver: true }
                  )}
              /> 
            ) : <Text>Go make choices</Text>}
        </SafeAreaView>
      );
}