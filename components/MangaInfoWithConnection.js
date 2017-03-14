import MangaInfo from './dumbs/MangaInfo';
import React from 'react'
import colors from '../config/colors'
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { addManga, getManga, getChapter } from '../ducks/mangas';
import { getMangaList } from '../ducks/mangaLists';
import { getNavigate } from '../ducks/navigation';

class MangaInfoWithConnection extends React.Component {
    state = {
        loading: true,
        error: '',
        manga: {}
    }
    static navigationOptions = {
        header: {
            style: { backgroundColor: colors.navigator }
        }
    }
    componentWillMount = async () => {
        const { manga_id } = this.props.navigation.state.params
        const { getManga, dispatch } = this.props
        let manga = getManga(manga_id)
        if (!manga) {
            try {
                const response = await fetch(`http://wannashare.info/api/v1/manga/${manga_id}`)
                manga = await response.json()
                dispatch(addManga(manga))

                this.setState({ loading: false, manga })
            } catch(e) {
                this.setState({ loading: false, error: e })
            } 
        } else {
            this.setState({ loading: false, manga })
        }
    }
    render() {
        const { manga_id } = this.props.navigation.state.params        
        const { getMangaList, navigateToManga, navigateToChapter } = this.props
        if (this.state.loading) return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color={colors.button}/>
            </View>
        )
        if (this.state.error) return (
            <View style={styles.container}>
                <Text style={styles.title}>Unable to fetch manga infomations. Error: {this.state.error}</Text>
            </View>
        )
        const { title, thumbnail, content: description, chapters } = this.state.manga
        return <MangaInfo 
            title={title}
            thumbnail={thumbnail}
            description={description}
            numberOfChapters={chapters.length}
            relatedMangas={getMangaList('recommend')}
            onMangaPress={manga_id => navigateToManga(manga_id)}
            onChapterPress={chapterId => navigateToChapter(manga_id, chapterId)}
        />
    }
}
MangaInfoWithConnection = connect(state => ({
    getManga: (manga_id) => getManga(state.mangas, manga_id),
    getMangaList: (name) => getMangaList(state.mangaLists, name),
    navigateToManga: (manga_id) => {
        const navigate = getNavigate(state.navigation, 'catalog')
        navigate('MangaInfo', { manga_id })
    },
    navigateToChapter: (manga_id, chapterId) => {
        const navigate = getNavigate(state.navigation, 'reading')
        navigate('Reading', { manga_id, chapterId })
    }
})
)(MangaInfoWithConnection)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background
    },
    title: {
        fontSize: 20,
        color: colors.title
    }
})


export default MangaInfoWithConnection