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
        search: (data) => axios.post('/api/librarian/users/search', { data }).then(res => res.data),
        getCurrentUser: () => axios.get('/api/users/currentUser').then(res => res.data.user),
        setUserData: (data) => axios.put('/api/users/updateData', data).then(res => res.data),
        setUserPassword: (data) => axios.put('/api/users/updatePassword', data).then(res => res.data),
        deleteUser: (id) => axios.delete(`/api/librarian/users/${id}`),
        updateAvatar: (data) => axios.put('/api/users/avatar', data).then(res => res.data)
    },
    book: {
        search: (searchData) => axios.get(`/api/books/${searchData.select}/${searchData.query}`).then(res => res.data),
        addBook: (data) => axios.post('/api/librarian/books', data).then(res => res.data.book),
        updateBook: (data) => axios.put('/api/librarian/books', data).then(res => res.data.book),
        deleteBook: (id) => axios.delete(`/api/librarian/books/${id}`),
    }
}