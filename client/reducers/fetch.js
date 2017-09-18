import { START_FETCHING, STOP_FETCHING, SET_ERRORS } from '../actions/types';

export default (state = { isFetching: false, errors: {} }, action) => {
    switch (action.type) {
        case START_FETCHING:
            return {
                isFetching: true
            };
        case STOP_FETCHING:
            return {
                ...state,
                isFetching: false
            };
        case SET_ERRORS:
            return {
                ...state,
                errors: action.errors
            };
        default:
            return state;
    }
};