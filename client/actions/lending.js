import api from '../api';

export const getLending = () => () => api.lending.getLending();