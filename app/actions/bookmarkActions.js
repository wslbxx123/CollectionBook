import axios from 'axios';

export const GET_BOOKMARKS_REQUEST = 'GET_BOOKMARKS_REQUEST';
export const GET_BOOKMARKS_SUCCESS = 'GET_BOOKMARKS_SUCCESS';
export const GET_BOOKMARKS_ERROR = 'GET_BOOKMARKS_ERROR';
export const ADD_BOOKMARK_REQUEST = 'ADD_BOOKMARK_REQUEST';
export const ADD_BOOKMARK_SUCCESS = 'ADD_BOOKMARK_SUCCESS';
export const ADD_BOOKMARK_ERROR = 'ADD_BOOKMARK_ERROR';

const getBookmarksSuccess = payload => ({
    type: GET_BOOKMARKS_SUCCESS,
    payload
});

const getBookmarksError = payload => ({
    type: GET_BOOKMARKS_ERROR,
    payload
});

const addBookmarkSuccess = payload => ({
    type: ADD_BOOKMARK_SUCCESS,
    payload
});

const addBookmarkError = payload => ({
    type: ADD_BOOKMARK_ERROR,
    payload
});

export const getBookmarks = (dispatch) => {
    dispatch({type: GET_BOOKMARKS_REQUEST});
    return axios.get('http://10.22.19.70/CollectionBookAPI/api/bookmark/GetBookmarks').then(res => {
        const response = res.data;
        dispatch(getBookmarksSuccess(response));
    }).catch(error => {
        dispatch(getBookmarksError("Something went wrong!"));
        return Promise.reject({});
    })
}

export const addBookmark = (dispatch, bookmark) => {
    dispatch({type: ADD_BOOKMARK_REQUEST});
    return axios.post('http://10.22.19.70/CollectionBookAPI/api/bookmark/AddBookmark', bookmark).then(res => {
        const response = res.data;
        dispatch(addBookmarkSuccess(response));
    }).catch(error => {
        dispatch(addBookmarkError("Something went wrong!"));
        return Promise.reject({});
    })
}