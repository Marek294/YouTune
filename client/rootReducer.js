/* eslint linebreak-style: ["error", "windows"] */

import { combineReducers } from 'redux';

import user from './reducers/user';
import videos from './reducers/videos';

export default combineReducers({
    user,
    videos,
});