import { StyleSheet } from "react-native";
import { CARD } from '../utils/constants'

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 45,

    },
    image: {
        width: CARD.CARD_WIDTH,
        height: CARD.CARD_HEIGHT,
        borderRadius: CARD.CARD_BORDER_RADIUS,
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 160,
        borderRadius: CARD.CARD_BORDER_RADIUS
    },
    name: {
        position: 'absolute',
        bottom: 22,
        left: 22,
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
    },
    choiceContainer: {
        position: 'absolute',
        top: 100,
    },
    likeContainer: {
        left: 45,
        transform: [{ rotate: '-30deg' }]
    },
    nopeContainer: {
        right: 45,
        transform: [{ rotate: '30deg' }],
    }
})
