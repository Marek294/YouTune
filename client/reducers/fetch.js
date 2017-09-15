import { START_FETCHING, STOP_FETCHING, SET_ERROR } from '../actions/types';

export default (state = { isFetching: false, error: {} }, action) => {
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
        case SET_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};