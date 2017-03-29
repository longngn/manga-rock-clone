const ADD_MANGA_LIST = 'app/mangaLists/ADD_MANGA_LIST'
const UPDATE_MANGA_LIST = 'app/mangaLists/UPDATE_MANGA_LIST'

export const addMangaList = (name, mangaIds) => ({
    type: ADD_MANGA_LIST,
    name,
    mangaIds
})

export const fetchMangaLists = (api, name) => async (dispatch, getState) => {
    let mangaList = getMangaList(getState().mangaLists, name)
    if (mangaList) return

    const response = await api()
    mangaList = response.result
    dispatch(addMangaList(name, mangaList))
    return mangaList
}

const mangaLists = (state = {}, action) => {
    switch (action.type) {
        case ADD_MANGA_LIST:
            return {
                ...state,
                [action.name]: action.mangaIds
            }
        case UPDATE_MANGA_LIST:
            return {
                ...state,
                [action.name]: [...state[name], ...action.mangaIds]
            }
        default: 
            return state
    }
}
export default mangaLists

export const getMangaList = (state, name) => state[name]