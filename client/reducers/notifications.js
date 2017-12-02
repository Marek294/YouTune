import _ from 'lodash'
import { ADD_NOTIFICATION, DESTROY_NOTIFICATION } from '../actions/types';

export default (state = [], action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
        {
            return [
                ...state,
                action.message
            ]
        } 
        case DESTROY_NOTIFICATION:
        {
            const notifications = state;
            const message = action.message;

            notifications.splice(_.findIndex(notifications, function(o) { return o.id == message.id; }),1);

            return notifications;
        } 
        default:
            return state;
    }
};