import { combineReducers } from 'redux';
import mangas from './mangas';
import mangaLists from './mangaLists';
import navigation from './navigation';

export default combineReducers({
    mangas,
    mangaLists,
    navigation
})