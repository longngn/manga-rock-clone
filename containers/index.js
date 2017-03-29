import React from 'react'
import RootNavigator from './RootNavigator'
import { AppRegistry } from 'react-native';

import { Provider } from 'react-redux';
import store from '../config/store'

const App = () => (
    <Provider store={store}>
        <RootNavigator />
    </Provider>
)

AppRegistry.registerComponent('VManga', () => App)
