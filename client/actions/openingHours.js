import api from '../api'

export const setOpeningHours = (data) => () => api.openingHours.setOpeningHours(data);