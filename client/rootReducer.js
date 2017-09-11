/* eslint linebreak-style: ["error", "windows"] */

import { combineReducers } from 'redux';

import videos from './reducers/videos';

export default combineReducers({
    user: () => ({}),
    videos,
});