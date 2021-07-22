import React, {useState, useContext} from 'react'
import {View, Text, Image, Modal, TouchableOpacity} from 'react-native'
import { Context } from '../../../store/context'
import { data } from '../../../data/dummyData'

import { styles } from './styles'
import { useNavigation } from '@react-navigation/core'

export default function Popup() {

    const nav = useNavigation(); 

    const {state, actions} = useContext(Context)
    const [show, setShow] = useState(true)

    const noShow = () => {
        actions({
          type: 'setState',
      
          payload: {
            ...state,
            value: false
          }
        })
      }


    const getObj = (list, id) => {
       const index = list.findIndex(function (obj, index) {
        return obj.id === id;
      });
       return list[index];
     };

     const pressPicture = () => {
        noShow();
        nav.navigate("Restaurant", { itemData: getObj(data, state.choice.id) })
     } 

    return (
        <Modal 
            transparent={true}
            visible={state.value}
        >
            <View style={styles.container}>
                <View style={styles.modalBox}>
                    <Text style={styles.modalHeader}>Here's Your Choice!</Text>
                    <TouchableOpacity onPress={() => pressPicture() }>
                    <Image source={state.choice.image} style={styles.image} resizeMode='cover'/>
                    <Text style={styles.modalRestaurant}>{state.choice.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.thankButton}
                    onPress={() => noShow()}
                    >
                    <Text style={styles.buttonText}>Thank You!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}