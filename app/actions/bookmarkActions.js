import axios from 'axios';

export const GET_BOOKMARKS_REQUEST = 'GET_BOOKMARKS_REQUEST';

export const getBookmarks = () => dispatch => {
    dispatch({type: GET_BOOKMARKS_REQUEST});
    return axios.get()
}