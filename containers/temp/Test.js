import React from 'react'
import { View, StyleSheet } from 'react-native';

export default () => (
    <View style={styles.container}>
        <View style={styles.item}></View>
        <View style={styles.item}></View>
        <View style={styles.item}></View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        flexDirection: 'row'
    },
    item: {
        flex: 1,
        borderColor: 'red',
        borderWidth: 1
    }
})