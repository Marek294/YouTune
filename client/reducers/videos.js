import { ADD_VIDEO } from '../actions/types';

export default ( state = [], action = {}) => {
    switch(action.type) {
        case ADD_VIDEO:
            return state.push(action.video);
        default: return state;
    }
}