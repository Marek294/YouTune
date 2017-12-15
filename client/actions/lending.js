import api from '../api';

export const getLending = () => () => api.lending.getLending();

export const getLendingHistoryCount = () => () => api.lending.getLendingHistoryCount();

export const getUserLending = (id) => () => api.lending.getUserLending(id);

export const getUserLendingHistory = (id) => () => api.lending.getUserLendingHistory(id);

export const returnBook = (id) => () => api.lending.returnBook(id);

export const addLend = (data) => () => api.lending.addLend(data);

export const getBookLendingHistory = (id, page, initialDate, finalDate) => () => api.lending.getBookLendingHistory(id, page, initialDate, finalDate);

export const getShowUserLendingHistory = (id, page, initialDate, finalDate) => () => api.lending.getShowUserLendingHistory(id, page, initialDate, finalDate);

export const getLend = (bookId) => () => api.lending.getLend(bookId);