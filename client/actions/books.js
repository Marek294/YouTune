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

export const updateBook = (data) => () => api.book.updateBook(data);

export const deleteBook = (id) => () => api.book.deleteBook(id);

export const getBook = (id) => () => api.book.getBook(id);

export const vote = (data) => () => api.book.vote(data);

export const getVote = (bookId) => () => api.book.getVote(bookId);