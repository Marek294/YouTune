/* eslint linebreak-style: ["error", "windows"] */

import axios from 'axios';

export default {
    user: {
        login: (credentials) => axios.post('/api/auth', { credentials }).then(res => res.data.user),
        signup: (data) => axios.post('/api/users', { data }).then(res => res.data.user),
        confirm: (token) => axios.post('/api/auth/confirmation', { token }).then(res => res.data.user),
        sendConfirmationEmail: (data) => axios.post('/api/auth/sendConfirmationEmail', { data }),
        resetPasswordRequest: (email) => axios.post('/api/auth/resetPasswordRequest', { email }),
        validateToken: (token) => axios.post('/api/auth/validateToken', { token }),
        resetPassword: (data) => axios.post('/api/auth/resetPassword', { data }),
        getUsers: () => axios.get('/api/librarian/users').then(res => res.data),
        getCurrentUser: () => axios.get('/api/users/currentUser').then(res => res.data.user)
    },
    book: {
        search: (searchData) => axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchData}`).then(res => res.data.items)
    }
}