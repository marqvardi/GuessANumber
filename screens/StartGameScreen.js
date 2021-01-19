import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar'
import React, { useState } from 'react'
import { Alert, Button, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import BodyText from '../components/BodyText'
import Card from '../components/Card'
import Input from '../components/Input'
import MainButton from '../components/MainButton'
import NumberContainer from '../components/NumberContainer'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'

const StartGameScreen = (props) => {

    const [enteredValued, SetEnteredValue] = useState("");
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

    const numberInputHandler = inputText => {
        SetEnteredValue(inputText.replace(/[^0-9]/g, ""))
    }

    const resetInputHandler = () => {
        SetEnteredValue("")
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValued)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert("Invalid number", "Number has to be from 1-99", [{ text: "Okay", style: "destructive", onPress: resetInputHandler }])
            return
        }

        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        SetEnteredValue("")
        Keyboard.dismiss()
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput =
            <Card style={styles.summayContainer}>
                <Text> You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                {/* <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)} /> */}
                <MainButton onPress={() => props.onStartGame(selectedNumber)} >
                    START GAME
                </MainButton>
            </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.screen}>
                <TitleText style={styles.title}> Start a new game</TitleText>
                <Card style={styles.inputContainer}  >
                    <BodyText>Select a number</BodyText>
                    <Input
                        onChangeText={numberInputHandler}
                        value={enteredValued}
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={2}
                        style={styles.input}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Reset" onPress={resetInputHandler} color={Colors.accent} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>

    )

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    button: {
        width: 100,
        borderRadius: 20,
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summayContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    text: {
        fontFamily: 'open-sans'
    }
})

export default StartGameScreen