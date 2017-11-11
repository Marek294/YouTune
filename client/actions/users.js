import { MODIFY_LOGGED_USER } from './types';
import { userLoggedIn } from './auth';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import api from '../api';

export const modifyLoggedUser = (data) => ({
    type: MODIFY_LOGGED_USER,
    data
})

export const modifyUser = (data) => dispatch => dispatch(modifyLoggedUser(data));

export const getCurrentUser = () => () => api.user.getCurrentUser()
export const search = (data) => () => api.user.search(data)
export const setUserData = (data) => () => api.user.setUserData(data)
export const setUserPassword = (data) => () => api.user.setUserPassword(data)
export const deleteUser = (id) => () => api.user.deleteUser(id)
export const updateAvatar = (data) => () => api.user.updateAvatar(data);

export const signup = (data) => dispatch => 
api.user.signup(data).then(user => {
    localStorage.mylibJWT = user.token;
    setAuthorizationToken(user.token);
    return dispatch(userLoggedIn(user));
});