import mapMangaIdsToObjects from './factories/mapMangaIdsToObjects'
import MangaList from '../presenters/MangaList'
import MangaCollection from '../presenters/MangaCollection'

export const MangaListConnected = mapMangaIdsToObjects(MangaList)
export const MangaCollectionConnected = mapMangaIdsToObjects(MangaCollection)