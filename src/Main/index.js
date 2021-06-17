import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { pets as petsArray } from './data'

export default function Main() {
    const [pets, setPets] = useState(petsArray);

    return (
        <View>
            {pets.map(({ name, source}) => {
                return <Text>{name}</Text>
            })}            
        </View>
    );
}