import shortid from 'shortid';
import { ADD_NOTIFICATION, DESTROY_NOTIFICATION } from './types';

export const add = (message) => ({
    type: ADD_NOTIFICATION,
    message
})

export const destroy = (message) => ({
    type: DESTROY_NOTIFICATION,
    message
})

export const addNotification = (message) => dispatch => {
    const id = shortid.generate();
    const newMessage = message;
    newMessage.id = id;
    return dispatch(add(newMessage))
}

export const destroyNotification = (message) => dispatch => {
    return dispatch(destroy(message))
}