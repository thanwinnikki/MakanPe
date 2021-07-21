import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', 
        bottom: '1%',
        left: '5%',
        width: '90%',
        paddingTop: 30,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 15,
        height: 150
    },
    chooseButton: {
        width: "40%",
        borderRadius: 35,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        margin: 15,
        backgroundColor: "#d9aa64",
        elevation: 15
    },
    resetButton: {
        width: "40%",
        borderRadius: 35,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        margin: 15,
        backgroundColor: "#e09e92",
        elevation: 15
    },
    loginText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
    }
})