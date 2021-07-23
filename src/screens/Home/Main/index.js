import React, { useCallback, useEffect, useRef, useState, useContext } from "react";
import { Animated, PanResponder, View, Text } from "react-native";

import Card from "../Card";
import { data as dataArray } from "../../../data/dummyData";
import { styles } from "./styles";
import Footer from "../Footer";
import { ACTION_OFFSET, CARD } from "../utils/constants";
import { Context } from "../../../store/context";

export default function Main({ navigation }) {
  const [data, setData] = useState(dataArray);
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;
  const {state, actions} = useContext(Context)

  useEffect(() => {
    if (!data.length) {
      setData(dataArray);
    }
  }, [data.length]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      tiltSign.setValue(y0 > CARD.CARD_HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTION_OFFSET;

      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * CARD.OUT_OF_SCREEN,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
        if (direction > 0) {
          console.log('liked')
        }
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });


  const removeTopCard = useCallback(() => {
    setData((prevState) => prevState.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handleChoice = useCallback(
    (direction) => {
      Animated.timing(swipe.x, {
        toValue: direction * CARD.OUT_OF_SCREEN,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x]
  );


  const updateList = (newList) => {
    
    actions({
      type: 'setState',

      payload: {
        ...state,
        list : newList,
      }
    })
}


  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          height: 50,
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
      {data
        .map(({ name, image, id }, index) => {
          const isFirst = index === 0;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};

          return (
            <Card
              key={name}
              name={name}
              id={id}
              source={image}
              isFirst={isFirst}
              swipe={swipe}
              tiltSign={tiltSign}
              {...dragHandlers}
            />
          );
        })
        .reverse()}

      {data
        .map(({ id }) => {
          return (
            <Footer
              key={id}
              id={id}
              navigation={navigation}
              handleChoice={handleChoice}
              updateList={updateList}
            />
          );
        })
        .reverse()}
    </View>
  );
}
