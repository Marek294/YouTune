/* eslint linebreak-style: ["error", "windows"] */

import { USER_LOGGED_IN, USER_LOGGED_OUT, MODIFY_LOGGED_USER } from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return action.user;
        case USER_LOGGED_OUT:
            return {};
        case MODIFY_LOGGED_USER:
            return {
                ...state,
                firstname: action.data.firstname,
                lastname: action.data.lastname
            }
        default:
            return state;
    }
};