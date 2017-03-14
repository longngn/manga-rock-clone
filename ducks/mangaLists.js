const ADD = 'app/mangaLists/ADD'
const UPDATE = 'app/mangaLists/UPDATE'

export const addMangaList = (name, mangas) => ({
    type: ADD,
    name,
    mangas
})

const mangaLists = (state = {}, action) => {
    const { type, name, mangas } = action
    switch (type) {
        case ADD:
            return {
                ...state,
                [name]: mangas
            }
        case UPDATE:
            return {
                ...state,
                [name]: [...state[name], ...mangas]
            }
        default: 
            return state
    }
}

export const getMangaList = (state, name) => state[name]? state[name] : []

export default mangaLists