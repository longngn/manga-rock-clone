import React from 'react'

import { connect } from 'react-redux';
import { getManga } from '../../ducks/mangas';

const mapMangaIdsToObjects = (MangasPresenter) => {
    let MangasContainer = ({ mangaIds, getManga, ...props }) => {
        const mangas = mangaIds.map(mangaId => {
            const manga = getManga(mangaId)
            manga.mangaId = manga.manga_id
            return manga
        })
        return <MangasPresenter {...props} mangas={mangas} />
    }
    MangasContainer = connect(state => ({
        getManga: (mangaId) => getManga(state.mangas, mangaId)
    }))(MangasContainer)

    return MangasContainer
}
export default mapMangaIdsToObjects