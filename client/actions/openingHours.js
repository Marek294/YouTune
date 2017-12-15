import api from '../api'

export const setOpeningHours = (data) => () => api.openingHours.setOpeningHours(data);

export const getOpeningHours = () => () => api.openingHours.getOpeningHours();