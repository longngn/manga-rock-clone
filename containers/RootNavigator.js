import React from 'react'
import { StackNavigator } from 'react-navigation';
import ReadingScreen from './ReadingScreen'
import TabNavigator from './TabNavigator'
import LoadingIndicator from '../presenters/LoadingIndicator'

import { connect } from 'react-redux';
import { fetchAllMangas } from '../ducks/mangas';
import { fetchMangaLists } from '../ducks/mangaLists';
import * as api from '../config/api';

const RootNavigator = StackNavigator({
    TabNavigator: { screen: TabNavigator },
    ReadingScreen: { screen: ReadingScreen }
}, {
    mode: 'modal',
    headerMode: 'screen'
})

class Wrapper extends React.Component {
    state = {
        loading: true,
        error: null
    }
    async componentDidMount() {
        const { dispatch } = this.props
        try {
            await dispatch(fetchAllMangas())
            await dispatch(fetchMangaLists(api.getTopMangas, 'top'))
            await dispatch(fetchMangaLists(api.getLatestMangas, 'latest'))
            await dispatch(fetchMangaLists(api.getRecommendedMangas, 'recommended'))
            this.setState({ loading: false })
        } catch (error) {
            this.setState({ loading: false, error })
        }
    }
    render() {
        if (this.state.loading) return <LoadingIndicator />
        if (this.state.error) console.log(`Cannot fetch all mangas. Error: ${this.state.error.message}`);
        return <RootNavigator />
    }
}
Wrapper = connect()(Wrapper)

export default Wrapper