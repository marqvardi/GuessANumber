import React from 'react'
import { StyleSheet, Text } from 'react-native'

const TitleText = props => <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>


const styles = StyleSheet.create({
    body: {
        fontFamily: 'open-sans-bold'
    }
})

export default TitleText