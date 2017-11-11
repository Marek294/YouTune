import { SET_USERS } from './types';
// import { startFetch, stopFetch, setErrors } from './fetch';
import { userLoggedIn } from './auth';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import api from '../api';

export const saveUsers = (users) => ({
    type: SET_USERS,
    users
})

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

// export const getUsers = () => dispatch => {
//     dispatch(startFetch());
//     api.user.getUsers()
//         .then(users => {
//             console.log(users);
//             dispatch(stopFetch());
//             return dispatch(saveUsers(users));
//         })
//         .catch(() => {
//             const errors = {
//                 global: 'Błąd wyszukiwania'
//             }
//             dispatch(setErrors(errors));
//             dispatch(stopFetch());
//         })
// }