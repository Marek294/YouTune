/* eslint linebreak-style: ["error", "windows"] */

import { USER_LOGGED_IN, USER_LOGGED_OUT } from './types';
import api from '../api';

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
        localStorage.youtuneJWT = user.token;
        return dispatch(userLoggedIn(user));
    });

export const logout = () => dispatch => {
    localStorage.removeItem('youtuneJWT');
    return dispatch(userLoggedOut());
}