import {
    GET_BOOKMARKS_REQUEST,
    GET_BOOKMARKS_SUCCESS,
    GET_BOOKMARKS_ERROR,
    ADD_BOOKMARK_ERROR,
    ADD_BOOKMARK_REQUEST,
    ADD_BOOKMARK_SUCCESS,
    DELETE_BOOKMARK_ERROR,
    DELETE_BOOKMARK_REQUEST,
    DELETE_BOOKMARK_SUCCESS,
    UPDATE_BOOKMARK_REQUEST,
    UPDATE_BOOKMARK_SUCCESS,
    UPDATE_BOOKMARK_ERROR
} from '../actions/bookmarkActions';

const INITIAL_STATE = {
    loading: false,
    hasError: false,
    error: null,
    data: []
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case GET_BOOKMARKS_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false,
                data: action.payload
            };
            
        case ADD_BOOKMARK_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false,
                data: [action.payload, ...state.data]
            };

        case DELETE_BOOKMARK_SUCCESS:
            return {
                ...state,
                loading: false,
                hasError: false,
                data: state.data.filter(b => b.id != action.payload)
            };

        case UPDATE_BOOKMARK_SUCCESS:
            const data = state.data.filter(b => b.id != action.payload.id)
            return {
                ...state,
                loading: false,
                hasError: false,
                data: [action.payload, ...data]
            };

        case GET_BOOKMARKS_REQUEST:
        case ADD_BOOKMARK_REQUEST:
        case DELETE_BOOKMARK_REQUEST:
        case UPDATE_BOOKMARK_REQUEST:
            return {
                ...state,
                loading: true
            };

        case GET_BOOKMARKS_ERROR:
        case ADD_BOOKMARK_ERROR:
        case DELETE_BOOKMARK_ERROR:
        case UPDATE_BOOKMARK_ERROR:
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