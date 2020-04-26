import {combineReducers} from 'redux';
import bookmarkReducers from './bookmarkReducers';

const rootReducer = combineReducers({
    bookmarks: bookmarkReducers
});

export default rootReducer;