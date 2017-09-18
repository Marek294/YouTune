import { GET_BOOKS, DELETE_BOOKS } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case GET_BOOKS:
            return action.books;
        case DELETE_BOOKS:
            return [];
        default:
            return state;
    }
};