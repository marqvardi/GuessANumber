import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton'
import TitleText from '../components/TitleText'
import colors from '../constants/colors'

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText> The game is over</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/success.png')}
                    // source={{uri: 'paste http link here'}}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>Your phone needed
                     <Text style={styles.highligth}> {props.roundsNumber}</Text>  rounds to guess the number
                <Text style={styles.highligth}> {props.roundsNumber}</Text>
                </BodyText>
            </View>


            <MainButton  onPress={props.onRestart}>
                New game</MainButton> 
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: '80%',
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    },
    resultText: {
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    highligth: {
        color: colors.primary,
        fontFamily: 'open-sans',
        textAlign: 'center'
    }
})

export default GameOverScreen