/* eslint linebreak-style: ["error", "windows"] */

import { USER_LOGGED_IN, USER_LOGGED_OUT } from './types';
import api from '../api';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export const userLoggedIn = (user) => ({
    type: USER_LOGGED_IN,
    user
})

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
})

// export const login = credentials => {
//     return dispatch => {
//         return api.user.login(credentials).then(user => dispatch(userLoggedIn(user)));
//     }
// }

export const login = (credentials) => dispatch => 
    api.user.login(credentials).then(user => {
        localStorage.mylibJWT = user.token;
        setAuthorizationToken(user.token);
        return dispatch(userLoggedIn(user));
    });

export const logout = () => dispatch => {
    localStorage.removeItem('mylibJWT');
    setAuthorizationToken();
    return dispatch(userLoggedOut());
}

export const confirm = (token) => dispatch => 
    api.user.confirm(token).then(user => {
        localStorage.mylibJWT = user.token;
        return dispatch(userLoggedIn(user));
    });

export const sendConfirmationEmail = (data) => () => api.user.sendConfirmationEmail(data);

export const resetPasswordRequest = ({ email }) => () => api.user.resetPasswordRequest(email);

export const validateToken = (token) => () => api.user.validateToken(token);

export const resetPassword = (data) => () => api.user.resetPassword(data);