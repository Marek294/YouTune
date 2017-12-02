/* eslint linebreak-style: ["error", "windows"] */

import { combineReducers } from 'redux';

import user from './reducers/user';
import books from './reducers/books';
import fetch from './reducers/fetch';
import users from './reducers/users';
import notifications from './reducers/notifications';

export default combineReducers({
    user,
    books,
    fetch,
    users,
    notifications
});