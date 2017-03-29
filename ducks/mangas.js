import * as api from '../config/api';

const RECEIVE_MANGAS = 'app/mangas/RECEIVE_MANGAS'
const UPDATE_MANGA = 'app/mangas/UPDATE_MANGA'

export const updateManga = (manga) => ({
    type: UPDATE_MANGA,
    manga
})

export const fetchMangaContent = (mangaId) => async (dispatch, getState) => {
    let manga = getManga(getState().mangas, mangaId)
    if (manga.chapters) return manga

    const response = await api.getMangaContent(mangaId)
    manga = response.entities.mangas[mangaId]
    dispatch({
        type: RECEIVE_MANGAS,
        mangas: response.entities.mangas
    })
    return manga
}

export const fetchAllMangas = () => async (dispatch, getState) => {
    if (Object.keys(getState().mangas).length > 0) return

    const response = await api.getAllMangas()
    const mangas = response.entities.mangas
    dispatch({
        type: RECEIVE_MANGAS,
        mangas
    })
    return mangas
}

const mangas = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_MANGAS:
            return {
                ...state,
                ...action.mangas
            }
        default:
            return state
    }
}
export default mangas

export const getManga = (state, mangaId) => state[mangaId]

export const getChapter = (state, mangaId, chapterNumber) => {
    const manga = getManga(state, mangaId)
    const chapters = manga.chapters
    const chapter = chapters[chapterNumber]
    const content = chapter.content
    return content
}
