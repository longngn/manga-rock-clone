import { schema } from 'normalizr';

export const manga = new schema.Entity('mangas', {}, { idAttribute: 'manga_id' })
export const plainMangaList = [manga]
export const complexMangaList = new schema.Object({
    data: plainMangaList
})