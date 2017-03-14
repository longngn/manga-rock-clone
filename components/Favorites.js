import React from 'react'
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../config/colors'

const Favorites = () => <Text>This is Favorites</Text>

Favorites.navigationOptions = {
    title: 'Favorites',
    tabBar: {
        icon: <Icon name='favorite' color={colors.button} />
    }
}
export default Favorites