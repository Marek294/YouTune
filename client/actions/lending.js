import api from '../api';

export const getLending = () => () => api.lending.getLending();

export const getUserLending = (id) => () => api.lending.getUserLending(id);

export const getUserLendingHistory = (id) => () => api.lending.getUserLendingHistory(id);

export const returnBook = (id) => () => api.lending.returnBook(id);

export const addLend = (data) => () => api.lending.addLend(data);