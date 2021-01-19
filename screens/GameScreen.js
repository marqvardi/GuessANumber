import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import Card from '../components/Card'
import MainButton from '../components/MainButton'
import NumberContainer from '../components/NumberContainer'
import defaultStyles from '../constants/default-styles'
import { Ionicons} from '@expo/vector-icons'
import BodyText from '../components/BodyText'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    const random = Math.floor(Math.random() * (max - min) + min)

    if (random === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return random
    }
}

// When using ScrollView line 83
// const renderListView = (value, numOfRound) => 
//     (
//     <View key={value } style={styles.listItem}>
//         <BodyText>#{numOfRound}</BodyText>
//         <BodyText>{value}</BodyText>
//     </View>
//     )

//When using Flatlist line 84
const renderListView = (listLength, itemData) => 
(
<View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
</View>
)

const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])

    const currentLow = useRef(1);
    const currentHigh = useRef(100)
    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if ((direction === "lower" && currentGuess < props.userChoice)
            ||
            (direction === "greater" && currentGuess > props.userChoice)) {
            Alert.alert("Don\'t lie!", "You know that this is wrong", [{ text: "Sorry", style: "cancel" }])
            return;
        }

        if (direction === "lower") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        // setRounds(curRounds => curRounds + 1)
        // setPastGuesses(curPastGuesses => [nextNumber , ...curPastGuesses]) // WHen using ScrollView (line 83)
        setPastGuesses(curPastGuesses => [nextNumber.toString() , ...curPastGuesses]) // When using FlatList (line 84)
    }

    return (
        <View style={styles.screen}> 
            <Text style={defaultStyles.title}>Opponent's guess </Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
                    <Ionicons name="md-remove" size={24} color='white' />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
                    <Ionicons name='md-add' size={24} color='white' />
                </MainButton>
            </Card>

            <View style={styles.listContainer}>
            {/* <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess, index) => renderListView(guess, pastGuesses.length - index))}
              
            </ScrollView> */}
            <FlatList 
                contentContainerStyle={styles.list} 
                keyExtractor={(item) => item} 
                data={pastGuesses} 
                renderItem={renderListView.bind(this, pastGuesses.length)}
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '90%',
    },
    listContainer: {
        width: '80%',
        flex: 1
    },
    list: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
    ,
    listItem: {
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    }
})

export default GameScreen