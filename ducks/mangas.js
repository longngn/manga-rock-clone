const ADD = 'app/mangas/ADD'

export const addManga = (manga) => ({
    type: ADD,
    payload: manga
})

const mangas = (state = {}, action) => {
    const { type, payload, error } = action
    if (error) return
    switch (type) {
        case ADD:
            return {
                ...state,
                [payload.manga_id]: payload
            }
        default:
            return state
    }
}

export const getManga = (state, manga_id) => {
    if (manga_id in state) return state[manga_id];
    else return null
}

export const getChapter = (state, manga_id, chapterId) => {
    const manga = getManga(state, manga_id)
    const chapters = manga.chapters
    const chapter = chapters[chapterId]
    const content = chapter[Object.keys(chapter)[0]].content
    return content
}

export default mangas