import api from '../api';

export const uploadCover = (data) => () => api.upload.uploadCover(data);