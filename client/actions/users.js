import { userLoggedIn } from './auth';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import api from '../api';

export const getCurrentUser = () => () => api.user.getCurrentUser()
export const search = (data) => () => api.user.search(data)
export const setUserData = (data) => dispatch => 
    api.user.setUserData(data).then(user => {
        localStorage.mylibJWT = user.token;
        setAuthorizationToken(user.token);
        dispatch(userLoggedIn(user));
        return user;
    })
    
export const setUserPassword = (data) => () => api.user.setUserPassword(data)
export const deleteUser = (id) => () => api.user.deleteUser(id)
export const updateAvatar = (data) => dispatch => 
    api.user.updateAvatar(data).then(user => {
        localStorage.mylibJWT = user.token;
        setAuthorizationToken(user.token);
        dispatch(userLoggedIn(user));
        return user;
    })

export const signup = (data) => dispatch => 
api.user.signup(data).then(user => {
    localStorage.mylibJWT = user.token;
    setAuthorizationToken(user.token);
    return dispatch(userLoggedIn(user));
});

export const getUser = (id) => () => api.user.getUser(id);