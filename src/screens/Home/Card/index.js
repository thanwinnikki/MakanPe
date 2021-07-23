import React, { useCallback, useContext } from 'react';
import { Animated, Image, Text } from 'react-native'
import Choice from '../Choice'
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles'
import { ACTION_OFFSET } from '../utils/constants';
import { Context } from "../../../store/context";
import { data } from "../../../data/dummyData"

export default function CARD({
    name,
    id,
    source,
    isFirst,
    swipe,
    tiltSign,
    addList,
    ...rest
}) {

    const {state, actions} = useContext(Context)
    const currRestaurant = data[id - 1];
    const newList = [ ...state.list, currRestaurant]


    const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
        inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
        outputRange: ['8deg', '0deg', '-8deg']
    })

    const likeOpacity = swipe.x.interpolate({
        inputRange: [35, ACTION_OFFSET],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    })

    const nopeOpacity = swipe.x.interpolate({
        inputRange: [-ACTION_OFFSET, -35],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    })

    const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), { rotate }],
    }

    const renderChoice = useCallback(() => {
        return (
            <>
                <Animated.View
                    style={[
                        styles.choiceContainer,
                        styles.likeContainer,
                        { opacity: likeOpacity },
                    ]}
                >
                    <Choice type="like" />
                </Animated.View>
                <Animated.View
                    style={[
                        styles.choiceContainer,
                        styles.nopeContainer,
                        { opacity: nopeOpacity },
                    ]}
                >
                    <Choice type="nope" />
                </Animated.View>
            </>
        )
    }, [likeOpacity, nopeOpacity])


    return (
        <Animated.View
            style={[styles.container, isFirst && animatedCardStyle]}
            {...rest}
        >
            <Image source={source} style={styles.image} />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.9)']}
                style={styles.gradient} />
            <Text style={styles.name}>{name}</Text>
            {
                isFirst && renderChoice()
            }
        </Animated.View>
    )
}