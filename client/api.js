/* eslint linebreak-style: ["error", "windows"] */

import axios from 'axios';

export default {
    user: {
        login: (credentials) => axios.post('/api/auth', { credentials }).then(res => res.data.user),
        signup: (data) => axios.post('/api/users', { data }).then(res => res.data.user),
        confirm: (token) => axios.post('/api/auth/confirmation', { token }).then(res => res.data.user),
        sendConfirmationEmail: (data) => axios.post('/api/auth/sendConfirmationEmail', { data }).then(res => res.data.user)
    },
    youtube: {
        getVideo: () => {

            return axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q=mnQM&topicId=%2Fm%2F064t9&key=AIzaSyCdOl-oTfPRsMOqVQAktYzSkNtIFALzrEM').then(res => res.data.items)
        }
    }
}