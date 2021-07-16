import { StyleSheet } from "react-native";
import { CARD } from '../../Home/utils/constants'

const marginBottomItem = 20;
const paddingItem = 10;
const imgHeight = 100;



export const styles = StyleSheet.create({
    background: {
      flex: 0.5,
      justifyContent: "center",
      backgroundColor: "white",
    },
    container: {
      position: "absolute",
      top: '10%',
      paddingLeft: 50,
    },
    imageBox: {
      width: CARD.CARD_WIDTH,
      height: CARD.CARD_HEIGHT,
      borderRadius: CARD.CARD_BORDER_RADIUS,
    },
    fontSize: {
      fontSize: 12,
      fontWeight: "bold",
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: CARD.CARD_BORDER_RADIUS
    },
    wrapText: {
      flex: 1,
      marginLeft: 10,
      justifyContent: 'center'
    },
    item: {
      flexDirection: 'row',
      marginBottom: marginBottomItem,
      borderRadius: 20,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10
      },
      shadowOpacity: .3,
      shadowRadius: 30,
      padding: paddingItem
    },
  });




  
  