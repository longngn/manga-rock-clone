import React from 'react'
import { TabNavigator } from 'react-navigation';
import Catalog from './Catalog'
import Favorites from './Favorites'
import Recent from './Recent'
import Downloads from './Downloads'
import Account from './Account'

import { connect } from 'react-redux';
import { addNavigate } from '../ducks/navigation';

import colors from '../config/colors'

const TabNavigatorComponent =  TabNavigator({
    Catalog: { screen: Catalog },
    Favorites: { screen: Favorites },
    Recent: { screen: Recent },
    Downloads: { screen: Downloads },
    Account: { screen: Account },
}, {
    tabBarOptions: {
        style: { backgroundColor: colors.navigator }
    }
})

class Wrapper extends React.Component {
    componentWillMount() {
        const { dispatch, navigation } = this.props
        dispatch(addNavigate('reading', navigation.navigate))
    }
    render() {
        return <TabNavigatorComponent />
    }
}
Wrapper.navigationOptions = {
    header: {
        visible: false
    }
}
Wrapper = connect()(Wrapper)

export default Wrapper