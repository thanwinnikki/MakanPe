import React, {useState, useContext} from 'react'
import {View, Text, Image, Modal, TouchableOpacity} from 'react-native'
import { Context } from '../../../store/context'

import { styles } from './styles'

export default function Popup() {

    const {state, actions} = useContext(Context)

    const noShow = () => {
        actions({
          type: 'setState',
    
          payload: {
            ...state,
            value: false
          }
        })
      }
    

    return (
        <Modal 
            transparent={true}
            visible={state.value}
        >
            <View 
                style={{backgroundColor:'#000000aa', flex: 1, paddingTop: 50}}
            >
                <View
                    style={{backgroundColor: '#ffffff', margin: 50, borderRadius: 15, padding: 40, flex: 0.8}}
                >
                    
                    <TouchableOpacity
                    style={styles.chooseButton}
                    onPress={() => noShow()}
                    >
                    <Text style={styles.buttonText}>Thank You!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}