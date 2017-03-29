import React from 'react'
import { ButtonGroup } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import colors from '../config/colors'
const styles = StyleSheet.create({
    buttonGroupContainer: {
        height: 30,
        backgroundColor: colors.background,
        borderColor: colors.button
    }
})

export default (props) => (
    <ButtonGroup
        {...props}
        containerStyle={styles.buttonGroupContainer}
        textStyle={{ color: colors.button }}
        selectedTextStyle={{ color: colors.background }}
        selectedBackgroundColor={colors.button}
        borderStyle={{ borderRightColor: colors.button }}
    />
)