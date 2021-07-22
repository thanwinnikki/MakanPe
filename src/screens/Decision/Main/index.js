import React, {useContext} from "react";
import { View, Text} from "react-native";
import { styles } from './styles'
import { Context } from '../../../store/context'
import ChoiceList from '../ChoiceList/index'
import Footer from "../Footer";
import Popup from "../Popup/index";



export default function Decision({navigation}) {

  const {state, actions} = useContext(Context)


    return(
      <View style={styles.background}>
        <View style={styles.header}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
            MakanPe
          </Text>
        </View>
        <ChoiceList nav={navigation} />
        <Popup />
        <Footer />
      </View>
    )
  }
