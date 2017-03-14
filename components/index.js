import React from 'react'
import Root from './Root'
import { AppRegistry } from 'react-native';

import { createStore, applyMiddleware } from 'redux';
import reducer from '../ducks'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';

export const store = createStore(reducer, applyMiddleware(thunk))

const App = () => (
    <Provider store={store}>
        <Root />
    </Provider>
)


AppRegistry.registerComponent('VManga', () => App)