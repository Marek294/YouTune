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
        setUserData: (data) => axios.put('/api/users/updateData', data).then(res => res.data.user),
        setUserPassword: (data) => axios.put('/api/users/updatePassword', data).then(res => res.data),
        deleteUser: (id) => axios.delete(`/api/librarian/users/${id}`),
        updateAvatar: (data) => axios.put('/api/users/avatar', data).then(res => res.data.user),
        getUser: (id) => axios.get(`/api/librarian/users/${id}`).then(res => res.data)
    },
    book: {
        search: (searchData) => axios.get(`/api/books/${searchData.select}/${searchData.query}`).then(res => res.data),
        addBook: (data) => axios.post('/api/librarian/books', data).then(res => res.data.book),
        updateBook: (data) => axios.put('/api/librarian/books', data).then(res => res.data.book),
        deleteBook: (id) => axios.delete(`/api/librarian/books/${id}`),
        getBook: (id) => axios.get(`api/books/${id}`).then(res => res.data),
        setVote: (data) => axios.post('api/votes', { data }).then(res => res.data.vote),
        getVote: (bookId) => axios.get(`api/votes/${bookId}`).then(res => res.data.vote),
        comment: (data) => axios.post('api/comments', { data }).then(res => res.data.comment),
        getComments: (bookId, page) => axios.get(`api/comments/${bookId}/${page}`).then(res => res.data),
        deleteComment: (id) => axios.delete(`api/comments/${id}`).then(res => res.data),
        librarianDeleteComment: (id) => axios.delete(`api/librarian/comments/${id}`).then(res => res.data),
    },
    lending: {
        getLending: () => axios.get('/api/lending').then(res => res.data),
        getUserLending: (id) => axios.get(`/api/librarian/lending/${id}`).then(res => res.data),
        getUserLendingHistory: (id) => axios.get(`api/librarian/lending/history/${id}`).then(res => res.data),
        returnBook: (id) => axios.put('/api/librarian/lending/return', { id }).then(res => res.data),
        addLend: (data) => axios.post('/api/librarian/lending/', { data }).then(res => res.data),
        getBookLendingHistory: (id, page, initialDate, finalDate) => axios.get(`/api/librarian/lending/history/book/${id}/${page}/${initialDate}/${finalDate}`).then(res => res.data),
        getLend: (bookId) => axios.get(`/api/librarian/lending/getLend/${bookId}`).then(res => res.data),
        getShowUserLendingHistory: (id, page, initialDate, finalDate) => axios.get(`/api/librarian/lending/history/user/${id}/${page}/${initialDate}/${finalDate}`).then(res => res.data),        
    },
    openingHours: {
        setOpeningHours: (data) => axios.post('/api/librarian/openingHours', data).then(res => res.data)
    }
}