import { StyleSheet } from "react-native";
import { CARD } from '../../Home/utils/constants'

const marginBottomItem = 20;
const paddingItem = 10;
const imgHeight = 100;



export const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: '10%',
      left: '3.5%',
      justifyContent: 'center',
      // borderWidth: 5,
      // borderColor: 'yellow'
    },
    imageBox: {
      width: CARD.CARD_WIDTH + 10,
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
      borderRadius: CARD.CARD_BORDER_RADIUS,
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
    text: {
      color: "white", 
      fontWeight: "bold", 
      fontSize: 30, 
      paddingTop: '50%', 
      paddingLeft: '1%',
      textAlign: 'center'
  },
  chooseButton: {
    width: "70%",
    borderRadius: 35,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    backgroundColor: "#00A36C",
    elevation: 10
  },
  buttonText: {
    color: "white", 
    fontWeight: "bold", 
    fontSize: 20
  }
  });




  
  