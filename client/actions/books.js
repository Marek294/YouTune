import { GET_BOOKS } from './types';
import api from '../api';
import { startFetch, stopFetch, setError } from './fetch';

export const saveBooks = (books) => ({
    type: GET_BOOKS,
    books
})

export const search = (searchData) => dispatch => {
    dispatch(startFetch());
    return api.book.search(searchData)
        .then(books => {
            dispatch(stopFetch());
            return dispatch(saveBooks(books))
        })
        .catch(() => {
            const error = {
                global: 'Błąd wyszukiwania'
            }
            dispatch(setError(error));
            dispatch(stopFetch());
        })
}