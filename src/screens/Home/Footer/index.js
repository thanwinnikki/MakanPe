import React from "react";
import { View } from 'react-native'

import RoundButton from "../RoundButton";
import { COLORS } from "../utils/constants";
import { styles } from './styles'
import { data } from "../../../data/dummyData"

export default function Footer({ handleChoice, id, navigation }) {
    return (
        <View style={styles.container}>
            <RoundButton
                name='times'
                size={40}
                color={COLORS.nope}
                onPress={() => handleChoice(-1)}
            />
            <></>
            <RoundButton
                name='info'
                size={34}
                color='black'
                onPress={() =>
                    navigation.navigate("Restaurant", {
                        itemData: data[id - 1],
                    })}
            />
            <></>
            <RoundButton
                name='heart'
                size={34}
                color={COLORS.like}
                onPress={() => handleChoice(1)}
            />
        </View>
    )
}

