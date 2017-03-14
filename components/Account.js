import React from 'react'
import { Text } from 'react-native';

const Account = () => <Text>This is Account</Text>

import { Icon } from 'react-native-elements';
import colors from '../config/colors';
Account.navigationOptions = {
    title: 'Account',
    tabBar: {
        icon: <Icon name='account-circle' color={colors.button} />
    }
}
export default Account