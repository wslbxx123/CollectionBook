import {combineReducers} from 'redux';
import bookmarkReducers from './bookmarkReducers';
import userReducers from './userReducers';

const rootReducer = combineReducers({
    bookmarks: bookmarkReducers,
    user: userReducers
});

export default rootReducer;