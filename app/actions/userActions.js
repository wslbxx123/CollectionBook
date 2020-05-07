import axios from 'axios';
import { COLLECTION_API_ADDRESS } from '../utils/apiSetting'
import setAuthToken from '../utils/setAuthToken'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

const loginSuccess = payload => ({
    type: LOGIN_SUCCESS,
    payload
});

const loginError = payload => ({
    type: LOGIN_ERROR,
    payload
});

export const login = (dispatch, loginInfo) => {
    dispatch({type: LOGIN_REQUEST});
    return axios.post(`${COLLECTION_API_ADDRESS}/CollectionBookAPI/api/login`, loginInfo).then(res => {
        const response = res.data;
        const { token } = res.data;
        // localStorage.setItem('jwToken', token);
        setAuthToken(token);

        dispatch(loginSuccess(response));
    }).catch(error => {
        dispatch(loginError("Something went wrong!"));
        return Promise.reject({});
    })
}