import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, PanResponder, View } from 'react-native'

import Card from '../Card'
import { data as dataArray } from '../../../data/dummyData'
import { styles } from './styles'
import Footer from '../Footer'
import { ACTION_OFFSET, CARD } from '../utils/constants'

export default function Main({ navigation }) {
    const [data, setData] = useState(dataArray)
    const swipe = useRef(new Animated.ValueXY()).current
    const tiltSign = useRef(new Animated.Value(1)).current

    useEffect(() => {
        if (!data.length) {
            setData(dataArray)
        }
    }, [data.length])

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx, dy, y0 }) => {
            swipe.setValue({ x: dx, y: dy })
            tiltSign.setValue(y0 > CARD.CARD_HEIGHT / 2 ? 1 : -1)
        },
        onPanResponderRelease: (_, { dx, dy }) => {

            const direction = Math.sign(dx)
            const isActionActive = Math.abs(dx) > ACTION_OFFSET

            if (isActionActive) {
                Animated.timing(swipe, {
                    duration: 200,
                    toValue: {
                        x: direction * CARD.OUT_OF_SCREEN,
                        y: dy
                    },
                    useNativeDriver: true
                }).start(removeTopCard)
            } else {
                Animated.spring(swipe, {
                    toValue: {
                        x: 0,
                        y: 0,
                    },
                    useNativeDriver: true,
                    friction: 5,
                }).start()
            }
        },
    })

    const removeTopCard = useCallback(() => {
        setData((prevState) => prevState.slice(1))
        swipe.setValue({ x: 0, y: 0 })
    }, [swipe])

    const handleChoice = useCallback(
        (direction) => {
            Animated.timing(swipe.x, {
                toValue: direction * CARD.OUT_OF_SCREEN,
                duration: 400,
                useNativeDriver: true,
            }).start(removeTopCard)
        },
        [removeTopCard, swipe.x]
    )

    const onInfoPress = (name) => console.log({ name })

    return (
        <View style={styles.container}>
            {data
                .map(({ name, image }, index) => {
                    const isFirst = index === 0;
                    const dragHandlers = isFirst ? panResponder.panHandlers : {}

                    return (
                        <Card
                            key={name}
                            name={name}
                            source={image}
                            isFirst={isFirst}
                            swipe={swipe}
                            tiltSign={tiltSign}
                            {...dragHandlers}
                        />
                    )
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
                        />
                    )
                })
                .reverse()}

        </View>
    )
}