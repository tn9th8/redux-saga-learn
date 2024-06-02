import { Types } from "../actions/users";
import { message } from 'antd';

const INITIAL_STATE = {
    items: [],
    error: '',
    userId: ''
};

export default function users(state = INITIAL_STATE, action) {
    switch(action.type) {
        case Types.GET_USER_SUCCESS: {
            return {
                ...state,
                items: action.payload.items
            };
        }
        case Types.FIRE_USER_ERROR: {
            return {
                ...state,
                error: action.payload.error
            };
        }
        case Types.WARN_DELETING_USER: {
            return {
                ...state,
                userId: action.payload.userId
            };
        }
        case Types.GET_CREATE_USERS: {
            const { items, error, userId } = state;
            items.unshift(action.payload.createUser)
            return {
                items,
                error,
                userId
            };
        }
        case Types.GET_NON_DELETE_USERS: {
            const { items, error } = state; 
            const userId = action.payload.userId;
            const newItems = items.filter((user) => {
                if (user.id === userId) {
                    return false;
                }
                return user;            
            });
            message.success(`The id-${userId} user was deleted`);
            return {
                items: newItems,
                error,
                userId: ''
            };
        }
        default: {
            return state;
        }
    }
}