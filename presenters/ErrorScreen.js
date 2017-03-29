import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

export default ({ message }) => (
    <View style={styles.container}>
        <Text style={styles.message}>{message}</Text>
    </View>
)

import colors from '../config/colors';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background
    },
    message: {
        fontSize: 20,
        color: colors.title
    }
})