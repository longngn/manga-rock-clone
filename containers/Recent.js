import React from 'react'
import { Text } from 'react-native';

const Recent = () => <Text>This is Recent</Text>

import { Icon } from 'react-native-elements';
import colors from '../config/colors';
Recent.navigationOptions = {
    title: 'Recent',
    tabBar: {
        icon: <Icon name='query-builder' color={colors.button} />
    }
}
export default Recent