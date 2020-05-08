import {
    LOGIN_REQUEST,
    LOGIN_ERROR,
    LOGIN_SUCCESS
} from '../actions/userActions';

const INITIAL_STATE = {
    login: false,
    userInfo: null,
    loading: false
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                login: true,
                userInfo: action.payload
            };

        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                login: false,
                userInfo: null
            };

        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            };

        default:
            return state;
    }
}