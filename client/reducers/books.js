import { GET_BOOKS } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case GET_BOOKS:
            return action.books;
        default:
            return state;
    }
};