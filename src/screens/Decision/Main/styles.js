import { StyleSheet } from "react-native";

const marginBottomItem = 20;
const paddingItem = 10;
const imgHeight = 100;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;


export const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: "#FF5858",
    },
    header: {
      flexDirection: "row",
      height: 50,
      width: "100%",
      backgroundColor: "#FF5858",
      alignItems: "flex-end",
      justifyContent: "space-between",
      paddingLeft: 15,
    }
    
  });

  
  