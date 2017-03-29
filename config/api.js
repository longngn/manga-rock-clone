import { manga, plainMangaList, complexMangaList } from './schema';
import { normalize } from 'normalizr';

export const getAllMangas = async () => {
    const response = await fetch('http://tastyvn.com/api/v1/list?$limit=0')
    const data = await response.json()
    return normalize(data, plainMangaList)
}

const getComplexMangaList = (api) => async () => {
    const response = await fetch(api)
    const data = await response.json()
    const normalizedData = normalize(data, complexMangaList)
    normalizedData.result = normalizedData.result.data
    return normalizedData
}

export const getTopMangas = getComplexMangaList('http://tastyvn.com/api/v1/list?$limit=30&$skip=50')
export const getLatestMangas = getComplexMangaList('http://tastyvn.com/api/v1/list?$limit=30&$skip=100')
export const getRecommendedMangas = getComplexMangaList('http://tastyvn.com/api/v1/list?$limit=30&$skip=150')
export const getMangasByName = (name) => getComplexMangaList(`http://tastyvn.com/api/v1/list/search?name=${name}`)

export const getMangaInfo = async (id) => {
    const response = await fetch(`http://tastyvn.com/api/v1/info/${id}`)
    const data = await response.json()
    return normalize(data, manga)
}

export const getMangaContent = async (id) => {
    const response = await fetch(`http://tastyvn.com/api/v1/manga/${id}`)
    const data = await response.json()
    return normalize(data, manga)
}