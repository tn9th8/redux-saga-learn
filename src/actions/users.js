export const Types = {
    GET_USER_REQUEST: 'users/get_users_request',
    GET_USER_SUCCESS: 'users/get_users_success',
    CREATE_USER_REQUEST: 'users/create_user_request',
    DELETE_USER_REQUEST: 'users/delete_user_request',
    FIRE_USER_ERROR: 'users/fire_user_error',
    WARN_DELETING_USER: 'users/warn_deleting_user',
    GET_CREATE_USERS: 'users/get_create_users',
    GET_NON_DELETE_USERS: 'users/get_non_delete_users',
    GET_NON_DELETE_USERS_REQUEST: 'users/get_non_delete_users_request',
}

export const getUsersRequest = () => ({
    type: Types.GET_USER_REQUEST
});

export const getUsersSuccess = ({items}) => ({
    type: Types.GET_USER_SUCCESS,
    payload: {
        items
    }
});

export const createUsersRequest = ({ firstName, lastName }) => ({
    type: Types.CREATE_USER_REQUEST,
    payload: {
        firstName,
        lastName
    }
});

export const deleteUsersRequest = ({ userId, confirm}) => ({
    type: Types.DELETE_USER_REQUEST,
    payload: { 
        userId,
        confirm,
    }
});

export const fireUserError = (error) => ({
    type: Types.FIRE_USER_ERROR,
    payload: { 
        error
    }
});

export const warnDeletingUser = (userId) => ({
    type: Types.WARN_DELETING_USER,
    payload: { 
        userId
    }
});

export const getCreateUsers = (createUser) => ({
    type: Types.GET_CREATE_USERS,
    payload: {
        createUser
    }
});

export const getNonDeleteUsers = (userId) => ({
    type: Types.GET_NON_DELETE_USERS,
    payload: {
        userId
    }
});

export const getNonDeleteUsersRequest = (userId) => ({
    type: Types.GET_NON_DELETE_USERS_REQUEST,
    payload: {
        userId
    }
});