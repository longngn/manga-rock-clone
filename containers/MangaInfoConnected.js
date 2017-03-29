import MangaInfo from '../presenters/MangaInfo';
import React from 'react'
import colors from '../config/colors'
import LoadingIndicator from '../presenters/LoadingIndicator'
import ErrorScreen from '../presenters/ErrorScreen'

import { connect } from 'react-redux';
import { fetchMangaContent } from '../ducks/mangas';
import { getManga } from '../ducks/mangas';
import { getMangaList } from '../ducks/mangaLists';
import { getNavigate } from '../ducks/navigation';

class MangaInfoConnected extends React.Component {
    state = {
        loading: true,
        error: null,
        manga: {}
    }
    static navigationOptions = {
        header: {
            style: { backgroundColor: colors.navigator }
        }
    }
    async componentDidMount() {
        const { mangaId } = this.props.navigation.state.params
        const { dispatch } = this.props
        try {
            const manga = await dispatch(fetchMangaContent(mangaId))
            this.setState({ loading: false, manga })
        } catch (error) {
            this.setState({ loading: false, error })
        }
    }
    render() {
        if (this.state.loading) return <LoadingIndicator />
        if (this.state.error) return <ErrorScreen message={this.state.error} />

        const { getMangaList, navigateToReading } = this.props
        const { stackNavigate } = this.props.navigation.state.params        
        const { title, thumbnail, content: description, chapters, manga_id: mangaId } = this.state.manga
        return (
            <MangaInfo 
                title={title}
                thumbnail={thumbnail}
                description={description}
                numberOfChapters={chapters.length}
                relatedMangas={getMangaList('recommended')}
                onMangaPress={mangaId => stackNavigate('MangaInfo', { 
                    mangaId, 
                    stackNavigate
                })}
                onChapterPress={chapterNumber => navigateToReading(mangaId, chapterNumber)}
            />
        )
    }
}
MangaInfoConnected = connect(state => ({
    getManga: (mangaId) => getManga(state.mangas, mangaId),
    getMangaList: (name) => getMangaList(state.mangaLists, name),
    
    navigateToReading: (mangaId, chapterNumber) => {
        const navigate = getNavigate(state.navigation, 'reading')
        navigate('ReadingScreen', { mangaId, chapterNumber })
    }
})
)(MangaInfoConnected)

export default MangaInfoConnected