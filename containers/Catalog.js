import React from 'react'
import { StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { MangaCollectionConnected } from './mangasContainers'
import MangaInfoConnected from './MangaInfoConnected';
import { Icon } from 'react-native-elements';
import ButtonGroup from '../presenters/ButtonGroup'

import { connect } from 'react-redux';
import { getMangaList } from '../ducks/mangaLists';

class Catalog extends React.Component {
    state = {
        selectedIndex: 0,
    }
    updateIndex = (selectedIndex) => { 
        this.setState({ selectedIndex })
    }
    render() {
        const { navigate } = this.props.navigation
        const { getMangaList } = this.props
        const mangaIds = (() => {
            switch (this.state.selectedIndex) {
                case 0: return getMangaList('top')
                case 1: return getMangaList('latest')
                case 2: return getMangaList('recommended')
                default: return []
            }
        })()

        return (
            <View style={styles.container}>
                <ButtonGroup
                    buttons={['Top', 'Latest', 'Recommend']}
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedIndex}
                />
                <MangaCollectionConnected 
                    mangaIds={mangaIds}
                    onMangaPress={mangaId => navigate('MangaInfo', { 
                        mangaId, 
                        stackNavigate: navigate 
                    })}
                />
            </View>
        )
    }
}

import colors from '../config/colors'
const styles = StyleSheet.create({
    headerTitle: {
        color: colors.title
    },
    header: {
        backgroundColor: colors.navigator
    },
    container: {
        backgroundColor: colors.background,
        flex: 1
    }
})

Catalog.navigationOptions = {
    title: 'Catalog',
    header: {
        style: styles.header,
        titleStyle: styles.headerTitle
    }
}
Catalog = connect(state => ({
    getMangaList: (name) => getMangaList(state.mangaLists, name)
}))(Catalog)

const CatalogNavigator =  StackNavigator({
    Catalog: { screen: Catalog },
    MangaInfo: { screen: MangaInfoConnected },
})
CatalogNavigator.navigationOptions = {
    title: 'Catalog',
    tabBar: {
        icon: <Icon name='view-headline' color={colors.button}/>
    }
}

export default CatalogNavigator