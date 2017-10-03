import { SET_USERS } from './types';
import { startFetch, stopFetch, setErrors } from './fetch';
import { userLoggedIn } from './auth';
import api from '../api';

export const saveUsers = (users) => ({
    type: SET_USERS,
    users
})

export const signup = (data) => dispatch => 
api.user.signup(data).then(user => {
    localStorage.youtuneJWT = user.token;
    return dispatch(userLoggedIn(user));
});

export const getUsers = () => dispatch => {
    dispatch(startFetch());
    api.user.getUsers()
        .then(users => {
            dispatch(stopFetch());
            return dispatch(saveUsers(users));
        })
        .catch(() => {
            const errors = {
                global: 'Błąd wyszukiwania'
            }
            dispatch(setErrors(errors));
            dispatch(stopFetch());
        })
}