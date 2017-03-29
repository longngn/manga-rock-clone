import React from 'react'
import { TouchableHighlight, Text, StyleSheet } from 'react-native';

const ReadButton = ({ title, onPress }) => (
    <TouchableHighlight style={styles.button} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
    </TouchableHighlight>
)

import colors from '../config/colors'
const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.button,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: colors.title,
        margin: 6,
        fontWeight: 'bold',
        fontSize: 13
    }
})

export default ReadButton