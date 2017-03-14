import mangaLists from '../ducks/mangaLists'
import { addMangaList, getMangaList } from '../ducks/mangaLists';

const mangas = [
    {
        manga_id: '111'
    },
    {
        manga_id: '222'
    }
]
it('addMangaList action', () => {
    const createdAction = addMangaList('top', mangas)
    const expected = {
        type: 'app/mangaLists/ADD',
        name: 'top',
        mangas
    }
    expect(createdAction).toEqual(expected)
})

it('getMangaList selector', () => {
    const state = {
        top: mangas
    }
    const selected = getMangaList(state, 'top')
    const expected = mangas
    expect(selected).toEqual(expected)
})
it('getMangaList selector with undefined name', () => {
    const state = {
        top: mangas
    }
    const selected = getMangaList(state, 'dick')
    const expected = []
    expect(selected).toEqual(expected)
})

it('mangaLists reducer', () => {
    const action = addMangaList('top', mangas)
    const actual = mangaLists({}, action)
    const expected = {
        top: mangas
    }
    expect(actual).toEqual(expected)
})