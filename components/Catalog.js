import React from 'react'
import { StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MangaCollection from './dumbs/MangaCollection'
import MangaInfo from './MangaInfoWithConnection';
import { Icon, ButtonGroup } from 'react-native-elements';

import { connect } from 'react-redux';
import { getMangaList } from '../ducks/mangaLists';
import { addNavigate } from '../ducks/navigation';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = { selectedIndex: 0 }
        this.updateIndex = this.updateIndex.bind(this)
    }
    componentWillMount() {
        const { dispatch, navigation } = this.props
        dispatch(addNavigate('catalog', navigation.navigate))
    }
    updateIndex(selectedIndex) { 
        this.setState({ selectedIndex })
    }
    render() {
        const { navigate } = this.props.navigation
        const { getMangaList } = this.props
        const mangas = (() => {
            switch (this.state.selectedIndex) {
                case 0: return getMangaList('top')
                case 1: return getMangaList('latest')
                case 2: return getMangaList('recommend')
                default: return []
            }
        })()

        return (
            <View style={styles.container}>
                <ButtonGroup
                    buttons={['Top', 'Latest', 'Recommend']}
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedIndex}
                    containerStyle={styles.buttonGroupContainer}
                    textStyle={{ color: colors.button }}
                    selectedTextStyle={{ color: colors.background }}
                    selectedBackgroundColor={colors.button}
                    borderStyle={{ borderRightColor: colors.button }}
                />
                <MangaCollection 
                    mangas={mangas} 
                    onMangaPress={manga_id => navigate('MangaInfo', { manga_id })}
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
    buttonGroupContainer: {
        height: 30,
        backgroundColor: colors.background,
        borderColor: colors.button
    },
    container: {
        backgroundColor: colors.background,
        flex: 1
    }
})

Home.navigationOptions = {
    title: 'Catalog',
    header: {
        style: styles.header,
        titleStyle: styles.headerTitle
    }
}
Home = connect(state => ({
    getMangaList: (name) => getMangaList(state.mangaLists, name)
}))(Home)

const Catalog =  StackNavigator({
    Home: { screen: Home },
    MangaInfo: { screen: MangaInfo },
})
Catalog.navigationOptions = {
    title: 'Catalog',
    tabBar: {
        icon: <Icon name='view-headline' color={colors.button}/>
    }
}

export default Catalog