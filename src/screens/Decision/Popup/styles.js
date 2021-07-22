import { StyleSheet } from "react-native";
import { CARD } from '../../Home/utils/constants'

const marginBottomItem = 20;
const paddingItem = 10;
const imgHeight = 100;



export const styles = StyleSheet.create({
  thankButton: {
    width: "70%",
    borderRadius: 35,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
    backgroundColor: "#00A36C",
    left: 30,
    padding: 15,
    elevation: 20,
  },
  buttonText: {
    color: "white", 
    fontWeight: "bold", 
    fontSize: 20,
    textAlign: 'center',
  },
  container: {
    backgroundColor:'#000000aa', 
    flex: 1, 
    paddingTop: 50
  },
  modalBox: {
    backgroundColor: '#FF5858', 
    margin: 50, 
    borderRadius: 15, 
    padding: 15, 
    width: '80%',
    height: '70%'
  },
  image: {
    width: 300 ,
    height: 200 ,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  modalHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
    padding: 15,
  },
  modalRestaurant: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center'
  }
  });




  
  