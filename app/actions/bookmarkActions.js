import axios from 'axios';

export const GET_BOOKMARKS_REQUEST = 'GET_BOOKMARKS_REQUEST';
export const GET_BOOKMARKS_SUCCESS = 'GET_BOOKMARKS_SUCCESS';
export const GET_BOOKMARKS_ERROR = 'GET_BOOKMARKS_ERROR';

const getBookmarksSuccess = payload => ({
    type: GET_BOOKMARKS_SUCCESS,
    payload
});

const getBookmarksError = payload => ({
    type: GET_BOOKMARKS_ERROR,
    payload
});

export const getBookmarks = (dispatch) => {
    dispatch({type: GET_BOOKMARKS_REQUEST});
    return axios.get('http://192.168.2.247/CollectionBookAPI/api/bookmark/GetBookmarks').then(res => {
        const response = res.data;
        dispatch(getBookmarksSuccess(response));
    }).catch(error => {
        dispatch(getBookmarksError("Something went wrong!"));
        return Promise.reject({});
    })
}