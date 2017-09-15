import { START_FETCHING, STOP_FETCHING, SET_ERROR } from './types';

export const startFetch = () => ({
    type: START_FETCHING
})

export const stopFetch = () => ({
    type: STOP_FETCHING
})

export const setError = (error) => ({
    type: SET_ERROR,
    error
})