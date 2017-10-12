import { GET_BOOKS, DELETE_BOOKS } from './types';
import api from '../api';

export const saveBooks = (books) => ({
    type: GET_BOOKS,
    books
})

export const deleteBooks = () => ({
    type: DELETE_BOOKS
})

export const search = (searchData) => () => api.book.search(searchData)

export const addBook = (data) => () => api.book.addBook(data);