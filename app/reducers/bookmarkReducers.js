import {
    GET_BOOKMARKS_REQUEST,
    GET_BOOKMARKS_SUCCESS,
    GET_BOOKMARKS_ERROR
} from '../actions/bookmarkActions';

const INITIAL_STATE = {
    loading: false,
    hasError: false,
    error: null,
    data: []
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case GET_BOOKMARKS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case GET_BOOKMARKS_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false,
                data: action.payload
            };

        case GET_BOOKMARKS_ERROR:
            return {
                ...state,
                loading: false,
                hasError: true,
                error: action.payload
            };

        default:
            return state;
    }
}