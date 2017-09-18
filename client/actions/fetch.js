import { START_FETCHING, STOP_FETCHING, SET_ERRORS } from './types';

export const startFetch = () => ({
    type: START_FETCHING
})

export const stopFetch = () => ({
    type: STOP_FETCHING
})

export const setErrors = (errors) => ({
    type: SET_ERRORS,
    errors
})