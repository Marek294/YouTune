/* eslint linebreak-style: ["error", "windows"] */

import { combineReducers } from 'redux';

import user from './reducers/user';
import notifications from './reducers/notifications';

export default combineReducers({
    user,
    notifications
});