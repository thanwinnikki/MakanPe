import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        top: '130%',
        paddingTop: 15,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 15
    },
    chooseButton: {
        width: "40%",
        borderRadius: 35,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        margin: 15,
        backgroundColor: "#00A36C",
      },
    resetButton: {
        width: "40%",
        borderRadius: 35,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        margin: 15,
        backgroundColor: "#A52A2A",
    },
    loginText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
    }
})