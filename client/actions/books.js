import { GET_BOOKS, DELETE_BOOKS } from './types';
import api from '../api';
import { startFetch, stopFetch, setErrors } from './fetch';

export const saveBooks = (books) => ({
    type: GET_BOOKS,
    books
})

export const deleteBooks = () => ({
    type: DELETE_BOOKS
})

export const search = (searchData) => dispatch => {
    dispatch(startFetch());
    dispatch(deleteBooks());
    return api.book.search(searchData)
        .then(books => {
            dispatch(stopFetch());
            return dispatch(saveBooks(books))
        })
        .catch(() => {
            const errors = {
                global: 'Błąd wyszukiwania'
            }
            dispatch(setErrors(errors));
            dispatch(stopFetch());
        })
}

export const addBook = (data) => () => api.book.addBook(data);