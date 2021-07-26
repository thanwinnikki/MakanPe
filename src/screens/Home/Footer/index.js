import React, {useContext} from "react";
import { View } from 'react-native'

import RoundButton from "../RoundButton";
import { COLORS } from "../utils/constants";
import { styles } from './styles'
import { data } from "../../../data/dummyData"
import { Context } from "../../../store/context";

export default function Footer({ handleChoice, id , navigation, updateList, position}) {
    const {state, actions} = useContext(Context)
    const currRestaurant = data[id - 1];


    const like = () => {

        handleChoice(1)
        updateList(data[position])
    }

    const dislike = () => {
        console.log(state.list)
        handleChoice(-1)
    }
    

    return (
        <View style={styles.container}>
            <RoundButton
                name='times'
                size={40}
                color={COLORS.nope}
                onPress={() => dislike()}
            />
            <></>
            <RoundButton
                name='info'
                size={34}
                color='black'
                onPress={() =>
                    navigation.navigate("Restaurant", {
                        itemData: data[id - 1],
                    })
                }
            />
            <></>
            <RoundButton
                name='heart'
                size={34}
                color={COLORS.like}
                onPress={() => like()}
            />
        </View>
    )
}


