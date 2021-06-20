import React, {useState} from 'react'
import { View } from 'react-native'
import {data as dataArray} from '../data/dummyData'
import Card from '../Card/index'

export default function Main() {

    const [data, setData] = useState(dataArray)

    return (
        <View>
            {data.map(({name, image}) => {
                return <Card key={name} name={name} image={image}/>
            })}
        </View>
    )
}
