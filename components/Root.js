import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Catalog from './Catalog'
import Favorites from './Favorites'
import Recent from './Recent'
import Downloads from './Downloads'
import Account from './Account'
import Reading from './Reading'

import { connect } from 'react-redux';
import { addMangaList } from '../ducks/mangaLists';
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

const RootNavigator = StackNavigator({
    Wrapper: { screen: Wrapper },
    Reading: { screen: Reading }
}, {
    mode: 'modal',
    headerMode: 'screen'
})

// temp
import top from './temp/list'
import latest from './temp/list'
import recommend from './temp/list'
//

class Root extends React.Component {
    state = {
        loading: true
    }
    componentWillMount = async () => {
        const { dispatch } = this.props
        
        try {
            //let top, latest, recommend
            // let response = await fetch('http://wannashare.info/api/v1/list/top')
            // top = await response.json()
            // response = await fetch('http://wannashare.info/api/v1/list/latest')
            // latest = await response.json()
            // response = await fetch('http://wannashare.info/api/v1/list/recommend')
            // recommend = await response.json()

            
            dispatch(addMangaList('top', top.data))
            dispatch(addMangaList('latest', latest.data))
            dispatch(addMangaList('recommend', recommend.data))

            this.setState({ loading: false })
        } catch(e) {
            this.setState({ loading: false })
        }
    }
    render() {
        if (this.state.loading) return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color={colors.button}/>
            </View>
        )
        return <RootNavigator />
    }
}
Root = connect()(Root)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background
    }
})

export default Root