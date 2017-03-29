import React from 'react'
import { Text } from 'react-native';

const Downloads = () => <Text>This is Download</Text>

import { Icon } from 'react-native-elements';
import colors from '../config/colors';
Downloads.navigationOptions = {
    title: 'Downloads',
    tabBar: {
        icon: <Icon name='system-update-alt' color={colors.button} />
    }
}
export default Downloads