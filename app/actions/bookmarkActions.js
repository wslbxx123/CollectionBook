import axios from 'axios';
import { COLLECTION_API_ADDRESS } from '../utils/apiSetting'
import { useSelector, shallowEqual } from 'react-redux';

export const GET_BOOKMARKS_REQUEST = 'GET_BOOKMARKS_REQUEST';
export const GET_BOOKMARKS_SUCCESS = 'GET_BOOKMARKS_SUCCESS';
export const GET_BOOKMARKS_ERROR = 'GET_BOOKMARKS_ERROR';
export const ADD_BOOKMARK_REQUEST = 'ADD_BOOKMARK_REQUEST';
export const ADD_BOOKMARK_SUCCESS = 'ADD_BOOKMARK_SUCCESS';
export const ADD_BOOKMARK_ERROR = 'ADD_BOOKMARK_ERROR';
export const DELETE_BOOKMARK_REQUEST = 'DELETE_BOOKMARK_REQUEST';
export const DELETE_BOOKMARK_SUCCESS = 'DELETE_BOOKMARK_SUCCESS';
export const DELETE_BOOKMARK_ERROR = 'DELETE_BOOKMARK_ERROR';
export const UPDATE_BOOKMARK_ERROR = 'UPDATE_BOOKMARK_ERROR';
export const UPDATE_BOOKMARK_REQUEST = 'UPDATE_BOOKMARK_REQUEST';
export const UPDATE_BOOKMARK_SUCCESS = 'UPDATE_BOOKMARK_SUCCESS';

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

const deleteBookmarkError = payload => ({
    type: DELETE_BOOKMARK_ERROR,
    payload
});

const deleteBookmarkSuccess = payload => ({
    type: DELETE_BOOKMARK_SUCCESS,
    payload
});

const updateBookmarkError = payload => ({
    type: UPDATE_BOOKMARK_ERROR,
    payload
});

const updateBookmarkSuccess = payload => ({
    type: UPDATE_BOOKMARK_SUCCESS,
    payload
});

export const getBookmarks = (dispatch) => {
    dispatch({type: GET_BOOKMARKS_REQUEST});
    return axios.get(`${COLLECTION_API_ADDRESS}/CollectionBookAPI/api/bookmark/GetBookmarks`).then(res => {
        const response = res.data;
        dispatch(getBookmarksSuccess(response));
    }).catch(error => {
        dispatch(getBookmarksError("Something went wrong!"));
        return Promise.reject({});
    })
}

export const addBookmark = (dispatch, bookmark) => {
    dispatch({type: ADD_BOOKMARK_REQUEST});
    return axios.post(`${COLLECTION_API_ADDRESS}/CollectionBookAPI/api/bookmark/AddBookmark`, bookmark).then(res => {
        const response = res.data;
        dispatch(addBookmarkSuccess(response));
    }).catch(error => {
        dispatch(addBookmarkError("Something went wrong!"));
        return Promise.reject({});
    })
}

export const deleteBookmark = (dispatch, bookmarkId) => {
    dispatch({type: DELETE_BOOKMARK_REQUEST});
    return axios.delete(`${COLLECTION_API_ADDRESS}/CollectionBookAPI/api/bookmark/DeleteBookmark/${bookmarkId}`).then(() => {
        dispatch(deleteBookmarkSuccess(bookmarkId));
    }).catch(error => {
        dispatch(deleteBookmarkError("Something went wrong!"));
        return Promise.reject({});
    })
}

export const updateBookmark = (dispatch, bookmark) => {
    dispatch({type: UPDATE_BOOKMARK_REQUEST});
    return axios.put(`${COLLECTION_API_ADDRESS}/CollectionBookAPI/api/bookmark/UpdateBookmark/${bookmark.id}`, bookmark).then(() => {
        dispatch(updateBookmarkSuccess(bookmark));
    }).catch(error => {
        dispatch(updateBookmarkError("Something went wrong!"));
        return Promise.reject({});
    })
}